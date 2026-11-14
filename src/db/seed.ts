import { count } from 'drizzle-orm';
import { db } from './index.ts';
import {
  courses,
  departments,
  events,
  newsArticles,
  siteSettings,
} from './schema.ts';

let seedPromise: Promise<void> | null = null;

async function runSeed() {
  const existingDepts = await db.select({ value: count() }).from(departments);
  if ((existingDepts[0]?.value ?? 0) === 0) {
    const insertedDepts = await db
      .insert(departments)
      .values([
        {
          slug: 'computer-science-ai',
          name: 'School of Computer Science & Artificial Intelligence',
          facultyCode: 'CS',
          headOfDepartment: 'Prof. Aoife Gallagher',
          location: 'O’Reilly Science Pavilion, Belfield Quarter',
          description:
            'Pioneering research and education in machine intelligence, distributed systems, human-computer interaction, and quantum software.',
          email: 'cs@aureliauniversity.ie',
          facultyCount: 42,
          imageUrl: '/src/assets/images/course_computer_science_1794652911256.jpg',
        },
        {
          slug: 'architecture-urbanism',
          name: 'School of Architecture, Planning & Environmental Policy',
          facultyCode: 'ARCH',
          headOfDepartment: 'Prof. Henrik Lindqvist',
          location: 'Richview Design Studios, East Campus',
          description:
            'Studio-led architectural education rooted in European urban heritage, low-carbon timber construction, and spatial equity.',
          email: 'architecture@aureliauniversity.ie',
          facultyCount: 29,
          imageUrl: '/src/assets/images/course_architecture_arts_1794652911134.jpg',
        },
        {
          slug: 'medicine-biomedical',
          name: 'School of Medicine & Biomedical Sciences',
          facultyCode: 'MED',
          headOfDepartment: 'Prof. Dr. Claire O’Sullivan',
          location: 'Conway Biomedical Complex, South Walk',
          description:
            'Translational medical science bridging genomic diagnostics, clinical trials, and European hospital partnerships.',
          email: 'medicine@aureliauniversity.ie',
          facultyCount: 68,
          imageUrl: '/src/assets/images/course_biomedical_research_1794652911922.jpg',
        },
        {
          slug: 'business-economics',
          name: 'Aurelia School of Business & Economics',
          facultyCode: 'BUS',
          headOfDepartment: 'Prof. Ronan McCarthy',
          location: 'Lochlann Quinn Building, Central Quad',
          description:
            'Triple-accredited business education integrating sustainable finance, European macroeconomic policy, and entrepreneurial leadership.',
          email: 'business@aureliauniversity.ie',
          facultyCount: 54,
          imageUrl: '/src/assets/images/campus_welcome_library_1794652910185.jpg',
        },
        {
          slug: 'law-european-governance',
          name: 'School of Law & European Governance',
          facultyCode: 'LAW',
          headOfDepartment: 'Prof. Camille Delacroix',
          location: 'Sutherland Jurisprudence Hall, North Terrace',
          description:
            'Comparative constitutional law, EU digital regulation, international arbitration, and human rights advocacy.',
          email: 'law@aureliauniversity.ie',
          facultyCount: 36,
          imageUrl: '/src/assets/images/campus_hero_1794652909890.jpg',
        },
        {
          slug: 'arts-humanities',
          name: 'School of Arts, Humanities & Literature',
          facultyCode: 'HUM',
          headOfDepartment: 'Prof. Seamus Ó Briain',
          location: 'Newman Literary Wing, Historic Quad',
          description:
            'Critical inquiry across Irish and European literature, philosophy, art history, modern languages, and archival studies.',
          email: 'humanities@aureliauniversity.ie',
          facultyCount: 47,
          imageUrl: '/src/assets/images/campus_welcome_library_1794652910185.jpg',
        },
        {
          slug: 'engineering-sustainable-systems',
          name: 'School of Engineering & Sustainable Systems',
          facultyCode: 'ENG',
          headOfDepartment: 'Prof. Nadia Al-Mansoor',
          location: 'FitzGerald Engineering Atrium, West Campus',
          description:
            'Advancing offshore wind grids, bio-materials, civil infrastructure resilience, and optical photonics.',
          email: 'engineering@aureliauniversity.ie',
          facultyCount: 51,
          imageUrl: '/src/assets/images/research_innovation_hub_1794652913228.jpg',
        },
        {
          slug: 'psychology-social-sciences',
          name: 'School of Psychology & Social Sciences',
          facultyCode: 'PSY',
          headOfDepartment: 'Prof. Maeve Brennan',
          location: 'Ardmore Social Research Centre',
          description:
            'Empirical cognitive neuroscience, developmental psychology, European sociology, and public policy evaluation.',
          email: 'psychology@aureliauniversity.ie',
          facultyCount: 33,
          imageUrl: '/src/assets/images/student_life_quad_1794652912616.jpg',
        },
      ])
      .onConflictDoNothing()
      .returning();

    const deptBySlug = new Map(insertedDepts.map((d) => [d.slug, d.id]));

    await db
      .insert(courses)
      .values([
        {
          slug: 'bsc-computer-science-ai',
          code: 'AU-CS101',
          title: 'BSc (Hons) Computer Science & Artificial Intelligence',
          departmentId: deptBySlug.get('computer-science-ai') ?? null,
          qualificationLevel: 'Undergraduate',
          duration: '4 Years',
          studyMode: 'Full-time',
          credits: '240 ECTS',
          summary:
            'Master algorithms, software architecture, and responsible machine intelligence with a dedicated six-month industry research placement.',
          overview:
            'Our flagship Computer Science & Artificial Intelligence degree blends rigorous mathematical foundations with hands-on systems engineering. From first-year algorithmic problem solving to fourth-year neural architecture research, students learn in small laboratory cohorts mentored by active European Research Council investigators.',
          entryRequirements:
            'Irish Leaving Certificate: 545+ points including H4 Mathematics; A-Levels: AAA including Mathematics; IB Diploma: 38 points with HL6 Mathematics. English proficiency IELTS 6.5.',
          careerOpportunities:
            'Machine Learning Engineer, Distributed Systems Architect, AI Safety Researcher, Quantitative Software Developer, Product Engineering Lead.',
          tuitionFee: '€7,950 / year (EU) · €22,400 / year (Non-EU)',
          imageUrl: '/src/assets/images/course_computer_science_1794652911256.jpg',
          featured: true,
        },
        {
          slug: 'barch-architecture-sustainable-urbanism',
          code: 'AU-AR104',
          title: 'BArch (Hons) Architecture & Sustainable Urbanism',
          departmentId: deptBySlug.get('architecture-urbanism') ?? null,
          qualificationLevel: 'Undergraduate',
          duration: '5 Years',
          studyMode: 'Full-time',
          credits: '300 ECTS',
          summary:
            'RIAI and RIBA-accredited studio programme exploring adaptive reuse, mass-timber engineering, and civic European placemaking.',
          overview:
            'Taught inside our daylight-flooded Richview Design Studios, this five-year professional degree balances tectonic fabrication with urban ecological theory. Students collaborate directly with Dublin municipal planners and undertake a mandatory European exchange semester in Year 3.',
          entryRequirements:
            'Portfolio assessment plus Leaving Certificate 510+ points, or A-Levels AAB, or IB 36 points. Spatial aptitude workshop invitation issued following portfolio review.',
          careerOpportunities:
            'Chartered Architect, Urban Regeneration Strategist, Sustainable Facade Consultant, Heritage Conservation Specialist.',
          tuitionFee: '€8,200 / year (EU) · €23,800 / year (Non-EU)',
          imageUrl: '/src/assets/images/course_architecture_arts_1794652911134.jpg',
          featured: true,
        },
        {
          slug: 'bsc-biomedical-translational-sciences',
          code: 'AU-MD110',
          title: 'BSc (Hons) Biomedical & Translational Sciences',
          departmentId: deptBySlug.get('medicine-biomedical') ?? null,
          qualificationLevel: 'Undergraduate',
          duration: '4 Years',
          studyMode: 'Full-time',
          credits: '240 ECTS',
          summary:
            'Investigate cellular genomics, immunology, and precision therapeutics inside our clinical-grade Conway Biomedical laboratories.',
          overview:
            'Designed for future biomedical scientists and medical researchers, this honours programme provides intensive bench-to-bedside laboratory training across molecular genetics, neurobiology, and computational pharmacology, culminating in a semester-long hospital or biotech thesis.',
          entryRequirements:
            'Leaving Certificate 555+ points with H4 in Chemistry and Biology or Physics; A-Levels AAA including Chemistry and Biology; IB 39 points.',
          careerOpportunities:
            'Translational Research Scientist, Clinical Trials Director, Biopharma R&D Specialist, Graduate Entry Medicine Pathway.',
          tuitionFee: '€8,400 / year (EU) · €24,900 / year (Non-EU)',
          imageUrl: '/src/assets/images/course_biomedical_research_1794652911922.jpg',
          featured: true,
        },
        {
          slug: 'msc-data-science-machine-learning',
          code: 'AU-CS502',
          title: 'MSc Data Science & Machine Learning',
          departmentId: deptBySlug.get('computer-science-ai') ?? null,
          qualificationLevel: 'Postgraduate',
          duration: '1 Year',
          studyMode: 'Full-time',
          credits: '90 ECTS',
          summary:
            'Intensive postgraduate specialisation in statistical inference, deep learning, causal modelling, and enterprise AI governance.',
          overview:
            'Delivered over three trimesters, the MSc in Data Science & Machine Learning prepares quantitative graduates to architect scalable analytical pipelines and trustworthy AI models for healthcare, climate modelling, and financial systems.',
          entryRequirements:
            'Upper Second Class Honours (2.1) degree in Computer Science, Mathematics, Physics, Statistics, or Engineering; IELTS 6.5 minimum.',
          careerOpportunities:
            'Lead Data Scientist, Applied AI Researcher, Quantitative Risk Analyst, MLOps Platform Architect.',
          tuitionFee: '€10,600 (EU) · €26,500 (Non-EU)',
          imageUrl: '/src/assets/images/course_computer_science_1794652911256.jpg',
          featured: true,
        },
        {
          slug: 'bcomm-international-business-economics',
          code: 'AU-BS108',
          title: 'BComm (Hons) International Business & Economics',
          departmentId: deptBySlug.get('business-economics') ?? null,
          qualificationLevel: 'Undergraduate',
          duration: '4 Years',
          studyMode: 'Full-time',
          credits: '240 ECTS',
          summary:
            'Combine corporate strategy, econometrics, and a salaried international corporate internship across Dublin, Frankfurt, or Brussels.',
          overview:
            'Built in partnership with European financial institutions and global technology hubs headquartered in Dublin, the BComm International degree pairs core accounting and macroeconomics with fluency in French, German, or Spanish.',
          entryRequirements:
            'Leaving Certificate 525+ points with H4 Mathematics and a modern language; A-Levels AAB; IB 37 points.',
          careerOpportunities:
            'Management Consultant, Investment Banking Analyst, European Policy Economist, ESG Strategy Director.',
          tuitionFee: '€7,600 / year (EU) · €21,500 / year (Non-EU)',
          imageUrl: '/src/assets/images/campus_welcome_library_1794652910185.jpg',
          featured: false,
        },
        {
          slug: 'bcl-law-european-studies',
          code: 'AU-LW102',
          title: 'BCL (Hons) Law with European Studies',
          departmentId: deptBySlug.get('law-european-governance') ?? null,
          qualificationLevel: 'Undergraduate',
          duration: '4 Years',
          studyMode: 'Full-time',
          credits: '240 ECTS',
          summary:
            'Examine common law jurisprudence, EU treaty governance, and international commercial arbitration with a year at a partner European faculty.',
          overview:
            'Recognised by the Honourable Society of King’s Inns and the Law Society of Ireland, our BCL combines mooting in our purpose-built courtroom with deep specialisation in digital rights, competition law, and environmental treaties.',
          entryRequirements:
            'Leaving Certificate 540+ points; A-Levels AAA; IB 38 points. Strong analytical writing profile required.',
          careerOpportunities:
            'Barrister, Corporate Solicitor, EU Legal Counsel, Human Rights Advocate, Judicial Clerk.',
          tuitionFee: '€7,500 / year (EU) · €20,800 / year (Non-EU)',
          imageUrl: '/src/assets/images/campus_hero_1794652909890.jpg',
          featured: false,
        },
        {
          slug: 'ba-english-literature-cultural-history',
          code: 'AU-HM105',
          title: 'BA (Hons) English Literature & Cultural History',
          departmentId: deptBySlug.get('arts-humanities') ?? null,
          qualificationLevel: 'Undergraduate',
          duration: '3 Years',
          studyMode: 'Full-time',
          credits: '180 ECTS',
          summary:
            'Explore modernist Dublin letters, comparative world literature, and rare manuscript curation within our historic Special Collections library.',
          overview:
            'A seminar-intensive humanities degree examining literary form from medieval codices to contemporary postcolonial fiction, guided by prize-winning novelists, historians, and literary critics.',
          entryRequirements:
            'Leaving Certificate 465+ points with H4 English; A-Levels ABB; IB 34 points.',
          careerOpportunities:
            'Editorial Director, Cultural Heritage Curator, Diplomatic Service Officer, Academic Researcher, Broadcast Journalist.',
          tuitionFee: '€7,100 / year (EU) · €19,600 / year (Non-EU)',
          imageUrl: '/src/assets/images/campus_welcome_library_1794652910185.jpg',
          featured: false,
        },
        {
          slug: 'meng-renewable-energy-climate-engineering',
          code: 'AU-EN515',
          title: 'MEng Renewable Energy & Climate Engineering',
          departmentId: deptBySlug.get('engineering-sustainable-systems') ?? null,
          qualificationLevel: 'Postgraduate',
          duration: '2 Years',
          studyMode: 'Full-time',
          credits: '120 ECTS',
          summary:
            'Engineer next-generation offshore wind systems, grid-scale storage, and industrial decarbonisation infrastructure.',
          overview:
            'Accredited by Engineers Ireland for Chartered Engineer status, this two-year Master of Engineering equips mechanical, electrical, and civil graduates to lead Europe’s net-zero energy transition.',
          entryRequirements:
            '2.1 Honours Bachelor’s degree in Engineering, Physics, or Applied Mathematics; IELTS 6.5.',
          careerOpportunities:
            'Offshore Wind Systems Lead, Grid Decarbonisation Engineer, Energy Policy Advisor, Sustainable Infrastructure Director.',
          tuitionFee: '€9,800 / year (EU) · €25,200 / year (Non-EU)',
          imageUrl: '/src/assets/images/research_innovation_hub_1794652913228.jpg',
          featured: false,
        },
        {
          slug: 'bsc-applied-psychology-neuroscience',
          code: 'AU-PS109',
          title: 'BSc (Hons) Applied Psychology & Cognitive Neuroscience',
          departmentId: deptBySlug.get('psychology-social-sciences') ?? null,
          qualificationLevel: 'Undergraduate',
          duration: '4 Years',
          studyMode: 'Full-time',
          credits: '240 ECTS',
          summary:
            'Investigate human perception, neuroimaging, and clinical behavioural science with PSI-accredited research training.',
          overview:
            'Students gain hands-on access to EEG, eye-tracking, and fMRI analysis suites while mastering psychometrics, organisational psychology, and mental health intervention design.',
          entryRequirements:
            'Leaving Certificate 530+ points; A-Levels AAB; IB 37 points.',
          careerOpportunities:
            'Clinical Psychology Pathway, Neuroimaging Analyst, UX Cognitive Researcher, Organisational Psychologist.',
          tuitionFee: '€7,650 / year (EU) · €21,800 / year (Non-EU)',
          imageUrl: '/src/assets/images/student_life_quad_1794652912616.jpg',
          featured: false,
        },
        {
          slug: 'phd-quantum-computing-photonics',
          code: 'AU-CS801',
          title: 'PhD Quantum Computing & Photonics',
          departmentId: deptBySlug.get('computer-science-ai') ?? null,
          qualificationLevel: 'Doctoral',
          duration: '4 Years',
          studyMode: 'Full-time',
          credits: '240 ECTS',
          summary:
            'Fully funded doctoral research programme advancing fault-tolerant quantum error correction and integrated optical chips.',
          overview:
            'Doctoral scholars join international research teams inside the Aurelia Photonics & Quantum Hub, receiving annual stipends, European lab exchange fellowships, and teaching mentorship.',
          entryRequirements:
            'First Class or Upper Second Class Master’s degree in Physics, Computer Science, or Electrical Engineering plus research proposal.',
          careerOpportunities:
            'University Principal Investigator, Quantum Hardware Architect, National Laboratory Fellow.',
          tuitionFee: 'Fully Funded Stipend (€25,000 / year + fee waiver)',
          imageUrl: '/src/assets/images/research_innovation_hub_1794652913228.jpg',
          featured: false,
        },
      ])
      .onConflictDoNothing();
  }

  const existingNews = await db.select({ value: count() }).from(newsArticles);
  if ((existingNews[0]?.value ?? 0) === 0) {
    await db
      .insert(newsArticles)
      .values([
        {
          slug: 'aurelia-opens-institute-sustainable-architecture',
          title: 'Aurelia University Opens €48 Million Institute for Sustainable Architecture and Urban Living',
          category: 'Campus & Infrastructure',
          summary:
            'Designed with cross-laminated Irish timber and passive solar glazing, the new Richview Pavilion houses 420 studio desks and a public civic gallery.',
          content:
            'Aurelia University Dublin has officially inaugurated the €48 million Institute for Sustainable Architecture and Urban Living on the eastern edge of Belfield Quarter.\n\nConceived as a living laboratory for low-carbon European urbanism, the building achieves net-zero operational emissions through geothermal heat exchange, rainwater harvesting, and locally milled structural timber.\n\nSpeaking at the opening ceremony, President Prof. Siobhán Kavanagh noted that the pavilion will host interdisciplinary fellowships uniting architects, climate engineers, and Dublin municipal planners to model resilient housing across European cities.\n\nThe ground-floor exhibition hall is open daily to the public and showcases student studio models alongside archival drawings from the university’s 1908 foundation.',
          author: 'Communications Office',
          publishedDate: '10 November 2026',
          readTime: '4 min read',
          imageUrl: '/src/assets/images/course_architecture_arts_1794652911134.jpg',
          featured: true,
        },
        {
          slug: 'erc-synergy-grant-biomedical-photonics',
          title: 'European Research Council Awards €6.2M Synergy Grant to Aurelia Biomedical Photonics Team',
          category: 'Research',
          summary:
            'Led by Prof. Claire O’Sullivan, the five-year consortium is developing non-invasive optical diagnostics for early neurodegenerative detection.',
          content:
            'A multidisciplinary team at the Conway Biomedical Complex has secured a prestigious €6.2 million European Research Council Synergy Grant in partnership with research hospitals in Munich and Leuven.\n\nThe project combines femtosecond laser spectroscopy with machine-learning image reconstruction to identify retinal biomarkers years before clinical symptoms appear.\n\n"By bridging quantum optics and clinical neurology under one roof, our doctoral researchers can translate fundamental physics directly into accessible bedside screening," said Prof. O’Sullivan.',
          author: 'Research Communications',
          publishedDate: '02 November 2026',
          readTime: '5 min read',
          imageUrl: '/src/assets/images/course_biomedical_research_1794652911922.jpg',
          featured: true,
        },
        {
          slug: 'record-international-intake-94-countries',
          title: 'Record International Intake Welcomes Scholars from 94 Countries to Dublin Campus',
          category: 'Admissions',
          summary:
            'Over 9,600 international undergraduate and postgraduate students have joined Aurelia University for the 2026–2027 academic session.',
          content:
            'Aurelia University Dublin has welcomed its most geographically diverse cohort in its 118-year history, with students representing 94 nationalities arriving across Belfield Quarter.\n\nSupported by €4.5 million in new Global Excellence Scholarships and guaranteed first-year campus accommodation, international scholars now comprise 34% of the student body.\n\nOrientation week featured multilingual academic advising, cultural showcases in the Central Quad, and community mentorship pairings with senior students.',
          author: 'Global Engagement Office',
          publishedDate: '19 October 2026',
          readTime: '3 min read',
          imageUrl: '/src/assets/images/student_life_quad_1794652912616.jpg',
          featured: true,
        },
        {
          slug: 'ai-ethics-european-governance-fellowship',
          title: 'New AI Ethics & European Governance Fellowship Launched for Postgraduate Researchers',
          category: 'Academic',
          summary:
            'Twelve fully funded fellowships will examine algorithmic accountability, EU AI Act compliance, and public-sector transparency.',
          content:
            'Jointly hosted by the School of Computer Science & Artificial Intelligence and the School of Law & European Governance, the fellowship bridges technical auditing with constitutional jurisprudence.\n\nFellows will publish open-source evaluation benchmarks and advise European public agencies on high-trust automated decision systems.',
          author: 'Academic Affairs',
          publishedDate: '08 October 2026',
          readTime: '4 min read',
          imageUrl: '/src/assets/images/course_computer_science_1794652911256.jpg',
          featured: false,
        },
        {
          slug: 'carbon-neutral-campus-solar-microgrid',
          title: 'Carbon-Neutral Campus Milestone: Solar Microgrid Now Powers 82% of Belfield Hall',
          category: 'Sustainability',
          summary:
            'Rooftop photovoltaic arrays and battery storage banks reduce campus peak grid draw by 1,900 tonnes of CO2 annually.',
          content:
            'As part of Aurelia University’s Strategic Sustainability Plan 2030, our Estates & Engineering teams have commissioned a smart campus microgrid linking twelve academic buildings.\n\nReal-time energy telemetry is integrated directly into undergraduate engineering coursework, turning campus infrastructure into a live teaching asset.',
          author: 'Sustainability Directorate',
          publishedDate: '27 September 2026',
          readTime: '3 min read',
          imageUrl: '/src/assets/images/research_innovation_hub_1794652913228.jpg',
          featured: false,
        },
      ])
      .onConflictDoNothing();
  }

  const existingEvents = await db.select({ value: count() }).from(events);
  if ((existingEvents[0]?.value ?? 0) === 0) {
    await db
      .insert(events)
      .values([
        {
          slug: 'autumn-postgraduate-research-open-evening',
          title: 'Autumn Postgraduate & Research Open Evening',
          category: 'Open Day',
          eventDate: '28 November 2026',
          startTime: '17:00',
          endTime: '20:30',
          location: 'O’Reilly Science Pavilion & Atrium',
          description:
            'Meet programme directors across all eight schools, explore €4.5M in postgraduate scholarships, and tour research laboratories.',
          registrationUrl: '/contact',
          imageUrl: '/src/assets/images/campus_hero_1794652909890.jpg',
          featured: true,
        },
        {
          slug: 'provost-lecture-resilient-european-cities',
          title: 'Annual Provost’s Lecture: Designing Resilient European Cities',
          category: 'Public Lecture',
          eventDate: '04 December 2026',
          startTime: '18:30',
          endTime: '20:00',
          location: 'FitzGerald Auditorium, Central Quad',
          description:
            'Keynote address by Prof. Henrik Lindqvist examining climate-adaptive urban housing and civic public spaces across northern Europe.',
          registrationUrl: '/contact',
          imageUrl: '/src/assets/images/course_architecture_arts_1794652911134.jpg',
          featured: true,
        },
        {
          slug: 'biomedical-innovation-medtech-symposium',
          title: 'Biomedical Innovation & MedTech Symposium 2026',
          category: 'Symposium',
          eventDate: '10 December 2026',
          startTime: '09:30',
          endTime: '17:00',
          location: 'Conway Biomedical Complex',
          description:
            'Full-day clinical science colloquium featuring keynote panels on genomic diagnostics, surgical robotics, and EU regulatory pathways.',
          registrationUrl: '/contact',
          imageUrl: '/src/assets/images/course_biomedical_research_1794652911922.jpg',
          featured: true,
        },
        {
          slug: 'international-student-welcome-orientation',
          title: 'Spring International Student Welcome & Dublin Orientation',
          category: 'Student Life',
          eventDate: '12 January 2027',
          startTime: '10:00',
          endTime: '16:00',
          location: 'Global Lounge, Student Centre',
          description:
            'Guided campus tours, residence check-in support, society sign-ups, and an evening cultural reception for incoming exchange scholars.',
          registrationUrl: '/contact',
          imageUrl: '/src/assets/images/student_life_quad_1794652912616.jpg',
          featured: false,
        },
        {
          slug: 'undergraduate-campus-tours-faculty-qa',
          title: 'Winter Undergraduate Campus Tours & Faculty Q&A',
          category: 'Campus Tour',
          eventDate: '18 January 2027',
          startTime: '11:00',
          endTime: '14:30',
          location: 'Historic Quad & Student Residences',
          description:
            'Student-led walking tours of lecture theatres, the Rare Books Library, sports facilities, and Belfield student apartments.',
          registrationUrl: '/contact',
          imageUrl: '/src/assets/images/campus_accommodation_1794652914016.jpg',
          featured: false,
        },
      ])
      .onConflictDoNothing();
  }

  const existingSettings = await db.select({ value: count() }).from(siteSettings);
  if ((existingSettings[0]?.value ?? 0) === 0) {
    await db
      .insert(siteSettings)
      .values([
        { key: 'hero_heading', value: 'Your Future Starts Here' },
        {
          key: 'hero_subtitle',
          value: 'Discover opportunities, develop your potential and achieve your ambitions.',
        },
        {
          key: 'welcome_heading',
          value: 'A Tradition of European Scholarship, Reimagined for Tomorrow',
        },
        {
          key: 'welcome_body',
          value:
            'Situated on 133 landscaped hectares in Dublin, Aurelia University unites 28,400 scholars, pioneering laboratories, and eight academic schools dedicated to intellectual discovery and global citizenship.',
        },
        { key: 'stat_total_students', value: '28,400+' },
        { key: 'stat_total_courses', value: '140+' },
        { key: 'stat_departments', value: '8 Schools' },
        { key: 'stat_international_students', value: '34%' },
      ])
      .onConflictDoNothing();
  }
}

export async function ensureSeeded(): Promise<void> {
  if (!seedPromise) {
    seedPromise = runSeed().catch((err) => {
      seedPromise = null;
      throw err;
    });
  }
  return seedPromise;
}
