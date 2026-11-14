/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { UniversityProvider } from './context/UniversityContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { MissionPage } from './pages/MissionPage';
import { DepartmentsPage } from './pages/DepartmentsPage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { EntryRequirementsPage } from './pages/EntryRequirementsPage';
import { StudentLifePage } from './pages/StudentLifePage';
import { AccommodationPage } from './pages/AccommodationPage';
import { StudentSupportPage } from './pages/StudentSupportPage';
import { ResearchPage } from './pages/ResearchPage';
import { NewsPage } from './pages/NewsPage';
import { NewsDetailPage } from './pages/NewsDetailPage';
import { EventsPage } from './pages/EventsPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { AccessibilityPage, PrivacyPolicyPage } from './pages/LegalPages';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

function NotFoundPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#B94D79] mb-2">
        404 · Page Not Found
      </p>
      <h1 className="font-serif text-4xl font-semibold text-[#29212A] mb-4">
        Page Could Not Be Found
      </h1>
      <p className="text-base text-[#29212A]/75 mb-8">
        The requested university page may have moved or does not exist.
      </p>
      <Link
        to="/"
        className="inline-flex items-center px-6 py-3 rounded-lg bg-[#B94D79] hover:bg-[#9C3A62] text-white text-sm font-medium transition-colors"
      >
        Return to Homepage
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <UniversityProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/mission" element={<MissionPage />} />
            <Route path="/departments" element={<DepartmentsPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:slug" element={<CourseDetailPage />} />
            <Route path="/admissions" element={<AdmissionsPage />} />
            <Route path="/entry-requirements" element={<EntryRequirementsPage />} />
            <Route path="/student-life" element={<StudentLifePage />} />
            <Route path="/accommodation" element={<AccommodationPage />} />
            <Route path="/student-support" element={<StudentSupportPage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:slug" element={<NewsDetailPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/accessibility" element={<AccessibilityPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </UniversityProvider>
  );
}
