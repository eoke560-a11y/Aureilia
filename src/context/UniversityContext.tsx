import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth, googleAuthProvider } from '../lib/firebase';
import {
  Course,
  Department,
  NewsArticle,
  SiteSettings,
  UniversityEvent,
} from '../types/university';

interface UniversityContextValue {
  settings: SiteSettings;
  courses: Course[];
  departments: Department[];
  news: NewsArticle[];
  events: UniversityEvent[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  user: User | null;
  authLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  getIdToken: () => Promise<string | null>;
}

const DEFAULT_SETTINGS: SiteSettings = {
  hero_heading: 'Your Future Starts Here',
  hero_subtitle:
    'Discover opportunities, develop your potential and achieve your ambitions.',
  welcome_heading:
    'A Tradition of European Scholarship, Reimagined for Tomorrow',
  welcome_body:
    'Situated on 133 landscaped hectares in Dublin, Aurelia University unites 28,400 scholars, pioneering laboratories, and eight academic schools dedicated to intellectual discovery and global citizenship.',
  stat_total_students: '28,400+',
  stat_total_courses: '140+',
  stat_departments: '8 Schools',
  stat_international_students: '34%',
};

const UniversityContext = createContext<UniversityContextValue | undefined>(
  undefined
);

export const UniversityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [courses, setCourses] = useState<Course[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [events, setEvents] = useState<UniversityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/bootstrap');
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || 'Unable to load university portal data');
      }
      const data = await response.json();
      setSettings({ ...DEFAULT_SETTINGS, ...(data.settings || {}) });
      setCourses(data.courses || []);
      setDepartments(data.departments || []);
      setNews(data.news || []);
      setEvents(data.events || []);
    } catch (err: any) {
      setError(err.message || 'Failed to connect to university server.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = useCallback(async () => {
    await signInWithPopup(auth, googleAuthProvider);
  }, []);

  const signOutUser = useCallback(async () => {
    await signOut(auth);
  }, []);

  const getIdToken = useCallback(async () => {
    if (!auth.currentUser) return null;
    return await auth.currentUser.getIdToken();
  }, []);

  return (
    <UniversityContext.Provider
      value={{
        settings,
        courses,
        departments,
        news,
        events,
        loading,
        error,
        refreshData,
        user,
        authLoading,
        signInWithGoogle,
        signOutUser,
        getIdToken,
      }}
    >
      {children}
    </UniversityContext.Provider>
  );
};

export function useUniversity() {
  const ctx = useContext(UniversityContext);
  if (!ctx) {
    throw new Error('useUniversity must be used within UniversityProvider');
  }
  return ctx;
}
