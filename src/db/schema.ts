import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(),
  email: text('email').notNull(),
  displayName: text('display_name').default(''),
  role: text('role').notNull().default('admin'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const departments = pgTable('departments', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  facultyCode: text('faculty_code').notNull(),
  headOfDepartment: text('head_of_department').notNull(),
  location: text('location').notNull(),
  description: text('description').notNull(),
  email: text('email').notNull(),
  facultyCount: integer('faculty_count').notNull().default(24),
  imageUrl: text('image_url').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  code: text('code').notNull(),
  title: text('title').notNull(),
  departmentId: integer('department_id').references(() => departments.id, {
    onDelete: 'set null',
  }),
  qualificationLevel: text('qualification_level').notNull(),
  duration: text('duration').notNull(),
  studyMode: text('study_mode').notNull().default('Full-time'),
  credits: text('credits').notNull().default('240 ECTS'),
  summary: text('summary').notNull(),
  overview: text('overview').notNull(),
  entryRequirements: text('entry_requirements').notNull(),
  careerOpportunities: text('career_opportunities').notNull(),
  tuitionFee: text('tuition_fee').notNull().default('€7,800 / year'),
  imageUrl: text('image_url').notNull(),
  featured: boolean('featured').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

export const newsArticles = pgTable('news_articles', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  summary: text('summary').notNull(),
  content: text('content').notNull(),
  author: text('author').notNull(),
  publishedDate: text('published_date').notNull(),
  readTime: text('read_time').notNull().default('4 min read'),
  imageUrl: text('image_url').notNull(),
  featured: boolean('featured').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  eventDate: text('event_date').notNull(),
  startTime: text('start_time').notNull(),
  endTime: text('end_time').notNull(),
  location: text('location').notNull(),
  description: text('description').notNull(),
  registrationUrl: text('registration_url').notNull().default('/contact'),
  imageUrl: text('image_url').notNull(),
  featured: boolean('featured').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

export const contactSubmissions = pgTable('contact_submissions', {
  id: serial('id').primaryKey(),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').default(''),
  department: text('department').notNull().default('General Admissions'),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  status: text('status').notNull().default('New'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const newsletterSubscribers = pgTable('newsletter_subscribers', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  subscribedAt: timestamp('subscribed_at').defaultNow(),
});

export const siteSettings = pgTable('site_settings', {
  id: serial('id').primaryKey(),
  key: text('key').notNull().unique(),
  value: text('value').notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const departmentsRelations = relations(departments, ({ many }) => ({
  courses: many(courses),
}));

export const coursesRelations = relations(courses, ({ one }) => ({
  department: one(departments, {
    fields: [courses.departmentId],
    references: [departments.id],
  }),
}));
