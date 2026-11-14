import React from 'react';
import { PageHeader } from '../components/PageHeader';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Privacy Policy' }]}
        kicker="Data Protection & GDPR"
        title="Privacy Policy"
        description="How Aurelia University Dublin collects, processes, and safeguards personal information under EU GDPR."
      />
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-base text-[#29212A]/85 leading-relaxed">
          <h2 className="font-serif text-2xl font-semibold text-[#29212A]">
            1. Data Controller & Lawful Basis
          </h2>
          <p>
            Aurelia University Dublin (Belfield Quarter, Dublin 4) acts as Data Controller for personal enquiries, newsletter subscriptions, and prospective applicant records submitted via this portal.
          </p>
          <h2 className="font-serif text-2xl font-semibold text-[#29212A]">
            2. Information Collected
          </h2>
          <p>
            When you submit our Contact Us form or subscribe to University Dispatches, we store only the contact details and enquiry message you intentionally provide. Data is retained strictly for admissions correspondence or requested updates.
          </p>
          <h2 className="font-serif text-2xl font-semibold text-[#29212A]">
            3. Your GDPR Rights
          </h2>
          <p>
            Under European Union data protection law, you may request access, rectification, or erasure of your records at any time by writing to dpo@aureliauniversity.ie.
          </p>
        </div>
      </section>
    </div>
  );
};

export const AccessibilityPage: React.FC = () => {
  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Accessibility Statement' }]}
        kicker="Inclusive Digital Campus"
        title="Accessibility Statement"
        description="Our commitment to WCAG 2.1 Level AA accessibility across Aurelia University digital platforms and physical buildings."
      />
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-base text-[#29212A]/85 leading-relaxed">
          <h2 className="font-serif text-2xl font-semibold text-[#29212A]">
            Digital Accessibility Standards
          </h2>
          <p>
            This website is engineered to conform with Web Content Accessibility Guidelines (WCAG) 2.1 AA, featuring high-contrast typography, semantic landmarks, keyboard navigation support, and reduced-motion responsiveness.
          </p>
          <h2 className="font-serif text-2xl font-semibold text-[#29212A]">
            Campus Access & Feedback
          </h2>
          <p>
            All Belfield Quarter lecture halls and residences provide step-free access, hearing loops, and quiet study rooms. To report an accessibility barrier, contact our Access & Lifelong Learning Centre at access@aureliauniversity.ie.
          </p>
        </div>
      </section>
    </div>
  );
};
