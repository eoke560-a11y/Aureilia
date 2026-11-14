import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, search]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#29212A]">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
