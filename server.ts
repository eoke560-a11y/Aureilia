import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
import {
  createContactSubmission,
  createCourse,
  createEvent,
  createNewsArticle,
  deleteCourse,
  deleteEvent,
  deleteNewsArticle,
  getAllContactSubmissions,
  getAllCourses,
  getAllDepartments,
  getAllEvents,
  getAllNewsArticles,
  getAllNewsletterSubscribers,
  getCourseBySlug,
  getNewsBySlug,
  getSiteSettingsMap,
  globalSearch,
  subscribeNewsletter,
  updateContactSubmissionStatus,
  updateCourse,
  upsertSiteSetting,
} from './src/db/queries.ts';
import { AuthRequest, requireAdmin } from './src/middleware/auth.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '2mb' }));

// Public University Data Routes
app.get('/api/bootstrap', async (_req, res) => {
  try {
    const [settings, courseList, departmentList, newsList, eventList] =
      await Promise.all([
        getSiteSettingsMap(),
        getAllCourses(),
        getAllDepartments(),
        getAllNewsArticles(),
        getAllEvents(),
      ]);
    res.json({
      settings,
      courses: courseList,
      departments: departmentList,
      news: newsList,
      events: eventList,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to load portal data' });
  }
});

app.get('/api/departments', async (_req, res) => {
  try {
    const data = await getAllDepartments();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch departments' });
  }
});

app.get('/api/courses', async (_req, res) => {
  try {
    const data = await getAllCourses();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch courses' });
  }
});

app.get('/api/courses/:slug', async (req, res) => {
  try {
    const course = await getCourseBySlug(req.params.slug);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch course' });
  }
});

app.get('/api/news', async (_req, res) => {
  try {
    const data = await getAllNewsArticles();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch news' });
  }
});

app.get('/api/news/:slug', async (req, res) => {
  try {
    const article = await getNewsBySlug(req.params.slug);
    if (!article) {
      return res.status(404).json({ error: 'News article not found' });
    }
    res.json(article);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch article' });
  }
});

app.get('/api/events', async (_req, res) => {
  try {
    const data = await getAllEvents();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch events' });
  }
});

app.get('/api/settings', async (_req, res) => {
  try {
    const data = await getSiteSettingsMap();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch settings' });
  }
});

app.get('/api/search', async (req, res) => {
  try {
    const q = String(req.query.q || '').trim();
    if (!q) {
      return res.json({ courses: [], departments: [], news: [], events: [] });
    }
    const results = await globalSearch(q);
    res.json(results);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Search failed' });
  }
});

// Public Form Submissions
app.post('/api/contact', async (req, res) => {
  try {
    const { fullName, email, phone, department, subject, message } = req.body || {};
    if (!fullName?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return res.status(400).json({
        error: 'Full name, email, subject, and message are required.',
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    const submission = await createContactSubmission({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone?.trim() || '',
      department: department?.trim() || 'General Admissions',
      subject: subject.trim(),
      message: message.trim(),
    });
    res.status(201).json(submission);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to submit enquiry' });
  }
});

app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body || {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(String(email).trim())) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }
    const result = await subscribeNewsletter(String(email));
    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Subscription failed' });
  }
});

// Authenticated Administrator Routes
app.get('/api/admin/me', requireAdmin, (req: AuthRequest, res) => {
  res.json({ user: req.dbUser });
});

app.post('/api/admin/courses', requireAdmin, async (req, res) => {
  try {
    const body = req.body || {};
    if (!body.title?.trim() || !body.code?.trim() || !body.qualificationLevel?.trim()) {
      return res.status(400).json({
        error: 'Course title, code, and qualification level are required.',
      });
    }
    const slug =
      body.slug?.trim() ||
      `${body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')}-${Date.now().toString().slice(-4)}`;

    const created = await createCourse({
      slug,
      code: body.code.trim(),
      title: body.title.trim(),
      departmentId: body.departmentId ? Number(body.departmentId) : null,
      qualificationLevel: body.qualificationLevel.trim(),
      duration: body.duration?.trim() || '3 Years',
      studyMode: body.studyMode?.trim() || 'Full-time',
      credits: body.credits?.trim() || '180 ECTS',
      summary: body.summary?.trim() || '',
      overview: body.overview?.trim() || body.summary?.trim() || '',
      entryRequirements:
        body.entryRequirements?.trim() || 'Standard Honours matriculation.',
      careerOpportunities:
        body.careerOpportunities?.trim() || 'Academic, industry, and public-sector leadership.',
      tuitionFee: body.tuitionFee?.trim() || '€7,800 / year',
      imageUrl:
        body.imageUrl?.trim() ||
        '/src/assets/images/course_computer_science_1794652911256.jpg',
      featured: Boolean(body.featured),
    });
    res.status(201).json(created);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to create course' });
  }
});

app.put('/api/admin/courses/:id', requireAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'Invalid course ID' });
    }
    const body = req.body || {};
    const updated = await updateCourse(id, {
      code: body.code,
      title: body.title,
      departmentId:
        body.departmentId === null || body.departmentId === ''
          ? null
          : body.departmentId
            ? Number(body.departmentId)
            : undefined,
      qualificationLevel: body.qualificationLevel,
      duration: body.duration,
      studyMode: body.studyMode,
      credits: body.credits,
      summary: body.summary,
      overview: body.overview,
      entryRequirements: body.entryRequirements,
      careerOpportunities: body.careerOpportunities,
      tuitionFee: body.tuitionFee,
      imageUrl: body.imageUrl,
      featured: typeof body.featured === 'boolean' ? body.featured : undefined,
    });
    if (!updated) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to update course' });
  }
});

app.delete('/api/admin/courses/:id', requireAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deleted = await deleteCourse(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json({ deleted: true, id });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to delete course' });
  }
});

app.post('/api/admin/news', requireAdmin, async (req, res) => {
  try {
    const body = req.body || {};
    if (!body.title?.trim() || !body.summary?.trim() || !body.content?.trim()) {
      return res.status(400).json({
        error: 'Title, summary, and article content are required.',
      });
    }
    const slug =
      body.slug?.trim() ||
      `${body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')}-${Date.now().toString().slice(-4)}`;
    const created = await createNewsArticle({
      slug,
      title: body.title.trim(),
      category: body.category?.trim() || 'University News',
      summary: body.summary.trim(),
      content: body.content.trim(),
      author: body.author?.trim() || 'Communications Office',
      publishedDate:
        body.publishedDate?.trim() ||
        new Date().toLocaleDateString('en-IE', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
      readTime: body.readTime?.trim() || '4 min read',
      imageUrl:
        body.imageUrl?.trim() || '/src/assets/images/campus_hero_1794652909890.jpg',
      featured: Boolean(body.featured),
    });
    res.status(201).json(created);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to publish news' });
  }
});

app.delete('/api/admin/news/:id', requireAdmin, async (req, res) => {
  try {
    const deleted = await deleteNewsArticle(Number(req.params.id));
    if (!deleted) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json({ deleted: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to delete article' });
  }
});

app.post('/api/admin/events', requireAdmin, async (req, res) => {
  try {
    const body = req.body || {};
    if (!body.title?.trim() || !body.eventDate?.trim() || !body.location?.trim()) {
      return res.status(400).json({
        error: 'Title, event date, and location are required.',
      });
    }
    const slug =
      body.slug?.trim() ||
      `${body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')}-${Date.now().toString().slice(-4)}`;
    const created = await createEvent({
      slug,
      title: body.title.trim(),
      category: body.category?.trim() || 'Campus Event',
      eventDate: body.eventDate.trim(),
      startTime: body.startTime?.trim() || '14:00',
      endTime: body.endTime?.trim() || '16:00',
      location: body.location.trim(),
      description: body.description?.trim() || '',
      registrationUrl: '/contact',
      imageUrl:
        body.imageUrl?.trim() || '/src/assets/images/student_life_quad_1794652912616.jpg',
      featured: Boolean(body.featured),
    });
    res.status(201).json(created);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to create event' });
  }
});

app.delete('/api/admin/events/:id', requireAdmin, async (req, res) => {
  try {
    const deleted = await deleteEvent(Number(req.params.id));
    if (!deleted) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ deleted: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to delete event' });
  }
});

app.get('/api/admin/contacts', requireAdmin, async (_req, res) => {
  try {
    const data = await getAllContactSubmissions();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to load submissions' });
  }
});

app.patch('/api/admin/contacts/:id', requireAdmin, async (req, res) => {
  try {
    const { status } = req.body || {};
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }
    const updated = await updateContactSubmissionStatus(Number(req.params.id), status);
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to update status' });
  }
});

app.get('/api/admin/subscribers', requireAdmin, async (_req, res) => {
  try {
    const data = await getAllNewsletterSubscribers();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to load subscribers' });
  }
});

app.put('/api/admin/settings', requireAdmin, async (req, res) => {
  try {
    const updates = req.body as Record<string, string>;
    if (!updates || typeof updates !== 'object') {
      return res.status(400).json({ error: 'Settings payload required' });
    }
    await Promise.all(
      Object.entries(updates).map(([k, v]) => upsertSiteSetting(k, String(v)))
    );
    const fresh = await getSiteSettingsMap();
    res.json(fresh);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to update settings' });
  }
});

async function startServer() {
  const PORT = Number(process.env.PORT) || 3000;

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Aurelia University server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
