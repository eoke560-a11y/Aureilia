import { desc, eq, ilike, or } from 'drizzle-orm';
import { db } from './index.ts';
import {
  contactSubmissions,
  courses,
  departments,
  events,
  newsArticles,
  newsletterSubscribers,
  siteSettings,
} from './schema.ts';
import { ensureSeeded } from './seed.ts';

export async function getSiteSettingsMap(): Promise<Record<string, string>> {
  try {
    await ensureSeeded();
    const rows = await db.select().from(siteSettings);
    const map: Record<string, string> = {};
    for (const row of rows) {
      map[row.key] = row.value;
    }
    return map;
  } catch (error) {
    console.error('Failed to fetch site settings:', error);
    throw new Error('Unable to load site configuration.', { cause: error });
  }
}

export async function upsertSiteSetting(key: string, value: string) {
  try {
    const result = await db
      .insert(siteSettings)
      .values({ key, value, updatedAt: new Date() })
      .onConflictDoUpdate({
        target: siteSettings.key,
        set: { value, updatedAt: new Date() },
      })
      .returning();
    return result[0];
  } catch (error) {
    console.error('Failed to update site setting:', error);
    throw new Error('Unable to update website content.', { cause: error });
  }
}

export async function getAllDepartments() {
  try {
    await ensureSeeded();
    return await db.select().from(departments).orderBy(departments.name);
  } catch (error) {
    console.error('Failed to fetch departments:', error);
    throw new Error('Unable to load academic departments.', { cause: error });
  }
}

export async function getAllCourses() {
  try {
    await ensureSeeded();
    return await db.query.courses.findMany({
      with: { department: true },
      orderBy: [desc(courses.featured), courses.title],
    });
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    throw new Error('Unable to load course catalogue.', { cause: error });
  }
}

export async function getCourseBySlug(slug: string) {
  try {
    await ensureSeeded();
    return await db.query.courses.findFirst({
      where: eq(courses.slug, slug),
      with: { department: true },
    });
  } catch (error) {
    console.error('Failed to fetch course detail:', error);
    throw new Error('Unable to load course details.', { cause: error });
  }
}

export async function createCourse(input: {
  slug: string;
  code: string;
  title: string;
  departmentId: number | null;
  qualificationLevel: string;
  duration: string;
  studyMode: string;
  credits: string;
  summary: string;
  overview: string;
  entryRequirements: string;
  careerOpportunities: string;
  tuitionFee: string;
  imageUrl: string;
  featured: boolean;
}) {
  try {
    const [created] = await db.insert(courses).values(input).returning();
    return created;
  } catch (error) {
    console.error('Failed to create course:', error);
    throw new Error('Unable to create course.', { cause: error });
  }
}

export async function updateCourse(
  id: number,
  input: Partial<{
    slug: string;
    code: string;
    title: string;
    departmentId: number | null;
    qualificationLevel: string;
    duration: string;
    studyMode: string;
    credits: string;
    summary: string;
    overview: string;
    entryRequirements: string;
    careerOpportunities: string;
    tuitionFee: string;
    imageUrl: string;
    featured: boolean;
  }>
) {
  try {
    const [updated] = await db
      .update(courses)
      .set(input)
      .where(eq(courses.id, id))
      .returning();
    return updated;
  } catch (error) {
    console.error('Failed to update course:', error);
    throw new Error('Unable to update course.', { cause: error });
  }
}

export async function deleteCourse(id: number) {
  try {
    const [deleted] = await db
      .delete(courses)
      .where(eq(courses.id, id))
      .returning();
    return deleted;
  } catch (error) {
    console.error('Failed to delete course:', error);
    throw new Error('Unable to delete course.', { cause: error });
  }
}

export async function getAllNewsArticles() {
  try {
    await ensureSeeded();
    return await db
      .select()
      .from(newsArticles)
      .orderBy(desc(newsArticles.featured), desc(newsArticles.id));
  } catch (error) {
    console.error('Failed to fetch news articles:', error);
    throw new Error('Unable to load news articles.', { cause: error });
  }
}

export async function getNewsBySlug(slug: string) {
  try {
    await ensureSeeded();
    const rows = await db
      .select()
      .from(newsArticles)
      .where(eq(newsArticles.slug, slug));
    return rows[0] ?? null;
  } catch (error) {
    console.error('Failed to fetch news article:', error);
    throw new Error('Unable to load news article.', { cause: error });
  }
}

export async function createNewsArticle(input: {
  slug: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  author: string;
  publishedDate: string;
  readTime: string;
  imageUrl: string;
  featured: boolean;
}) {
  try {
    const [created] = await db.insert(newsArticles).values(input).returning();
    return created;
  } catch (error) {
    console.error('Failed to create news article:', error);
    throw new Error('Unable to publish news article.', { cause: error });
  }
}

export async function deleteNewsArticle(id: number) {
  try {
    const [deleted] = await db
      .delete(newsArticles)
      .where(eq(newsArticles.id, id))
      .returning();
    return deleted;
  } catch (error) {
    console.error('Failed to delete news article:', error);
    throw new Error('Unable to delete news article.', { cause: error });
  }
}

export async function getAllEvents() {
  try {
    await ensureSeeded();
    return await db
      .select()
      .from(events)
      .orderBy(desc(events.featured), events.id);
  } catch (error) {
    console.error('Failed to fetch events:', error);
    throw new Error('Unable to load university events.', { cause: error });
  }
}

export async function createEvent(input: {
  slug: string;
  title: string;
  category: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  registrationUrl: string;
  imageUrl: string;
  featured: boolean;
}) {
  try {
    const [created] = await db.insert(events).values(input).returning();
    return created;
  } catch (error) {
    console.error('Failed to create event:', error);
    throw new Error('Unable to create event.', { cause: error });
  }
}

export async function deleteEvent(id: number) {
  try {
    const [deleted] = await db
      .delete(events)
      .where(eq(events.id, id))
      .returning();
    return deleted;
  } catch (error) {
    console.error('Failed to delete event:', error);
    throw new Error('Unable to delete event.', { cause: error });
  }
}

export async function createContactSubmission(input: {
  fullName: string;
  email: string;
  phone?: string;
  department: string;
  subject: string;
  message: string;
}) {
  try {
    const [created] = await db
      .insert(contactSubmissions)
      .values({
        fullName: input.fullName,
        email: input.email,
        phone: input.phone ?? '',
        department: input.department,
        subject: input.subject,
        message: input.message,
      })
      .returning();
    return created;
  } catch (error) {
    console.error('Failed to save contact submission:', error);
    throw new Error('Unable to submit your enquiry. Please try again.', {
      cause: error,
    });
  }
}

export async function getAllContactSubmissions() {
  try {
    return await db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt));
  } catch (error) {
    console.error('Failed to fetch contact submissions:', error);
    throw new Error('Unable to load contact submissions.', { cause: error });
  }
}

export async function updateContactSubmissionStatus(id: number, status: string) {
  try {
    const [updated] = await db
      .update(contactSubmissions)
      .set({ status })
      .where(eq(contactSubmissions.id, id))
      .returning();
    return updated;
  } catch (error) {
    console.error('Failed to update contact submission status:', error);
    throw new Error('Unable to update submission status.', { cause: error });
  }
}

export async function subscribeNewsletter(email: string) {
  try {
    const [row] = await db
      .insert(newsletterSubscribers)
      .values({ email: email.trim().toLowerCase() })
      .onConflictDoNothing({ target: newsletterSubscribers.email })
      .returning();
    return row ?? { email: email.trim().toLowerCase(), alreadySubscribed: true };
  } catch (error) {
    console.error('Failed to subscribe newsletter:', error);
    throw new Error('Unable to process newsletter subscription.', { cause: error });
  }
}

export async function getAllNewsletterSubscribers() {
  try {
    return await db
      .select()
      .from(newsletterSubscribers)
      .orderBy(desc(newsletterSubscribers.subscribedAt));
  } catch (error) {
    console.error('Failed to load newsletter subscribers:', error);
    throw new Error('Unable to load newsletter subscribers.', { cause: error });
  }
}

export async function globalSearch(queryText: string) {
  try {
    await ensureSeeded();
    const q = `%${queryText.trim()}%`;
    const [matchedCourses, matchedDepartments, matchedNews, matchedEvents] =
      await Promise.all([
        db.query.courses.findMany({
          where: or(
            ilike(courses.title, q),
            ilike(courses.code, q),
            ilike(courses.summary, q),
            ilike(courses.qualificationLevel, q)
          ),
          with: { department: true },
          limit: 6,
        }),
        db
          .select()
          .from(departments)
          .where(or(ilike(departments.name, q), ilike(departments.description, q)))
          .limit(4),
        db
          .select()
          .from(newsArticles)
          .where(or(ilike(newsArticles.title, q), ilike(newsArticles.summary, q)))
          .limit(4),
        db
          .select()
          .from(events)
          .where(or(ilike(events.title, q), ilike(events.description, q)))
          .limit(4),
      ]);

    return {
      courses: matchedCourses,
      departments: matchedDepartments,
      news: matchedNews,
      events: matchedEvents,
    };
  } catch (error) {
    console.error('Failed to perform search:', error);
    throw new Error('Search service unavailable.', { cause: error });
  }
}
