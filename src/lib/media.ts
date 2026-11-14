import campusHero from '../assets/images/campus_hero_1794652909890.jpg';
import campusWelcomeLibrary from '../assets/images/campus_welcome_library_1794652910185.jpg';
import courseComputerScience from '../assets/images/course_computer_science_1794652911256.jpg';
import courseArchitectureArts from '../assets/images/course_architecture_arts_1794652911134.jpg';
import courseBiomedicalResearch from '../assets/images/course_biomedical_research_1794652911922.jpg';
import studentLifeQuad from '../assets/images/student_life_quad_1794652912616.jpg';
import researchInnovationHub from '../assets/images/research_innovation_hub_1794652913228.jpg';
import campusAccommodation from '../assets/images/campus_accommodation_1794652914016.jpg';

export const UNIVERSITY_MEDIA = {
  campusHero,
  campusWelcomeLibrary,
  courseComputerScience,
  courseArchitectureArts,
  courseBiomedicalResearch,
  studentLifeQuad,
  researchInnovationHub,
  campusAccommodation,
} as const;

const PATH_MAP: Record<string, string> = {
  '/src/assets/images/campus_hero_1794652909890.jpg': campusHero,
  '/src/assets/images/campus_welcome_library_1794652910185.jpg': campusWelcomeLibrary,
  '/src/assets/images/course_computer_science_1794652911256.jpg': courseComputerScience,
  '/src/assets/images/course_architecture_arts_1794652911134.jpg': courseArchitectureArts,
  '/src/assets/images/course_biomedical_research_1794652911922.jpg': courseBiomedicalResearch,
  '/src/assets/images/student_life_quad_1794652912616.jpg': studentLifeQuad,
  '/src/assets/images/research_innovation_hub_1794652913228.jpg': researchInnovationHub,
  '/src/assets/images/campus_accommodation_1794652914016.jpg': campusAccommodation,
};

export const IMAGE_OPTIONS = [
  { label: 'Historic Campus Quad', value: '/src/assets/images/campus_hero_1794652909890.jpg' },
  { label: 'Rare Books & Main Library', value: '/src/assets/images/campus_welcome_library_1794652910185.jpg' },
  { label: 'Computer Science & AI Lab', value: '/src/assets/images/course_computer_science_1794652911256.jpg' },
  { label: 'Architecture Design Studio', value: '/src/assets/images/course_architecture_arts_1794652911134.jpg' },
  { label: 'Biomedical Research Laboratory', value: '/src/assets/images/course_biomedical_research_1794652911922.jpg' },
  { label: 'Student Life Courtyard', value: '/src/assets/images/student_life_quad_1794652912616.jpg' },
  { label: 'Research & Innovation Hub', value: '/src/assets/images/research_innovation_hub_1794652913228.jpg' },
  { label: 'Belfield Student Residences', value: '/src/assets/images/campus_accommodation_1794652914016.jpg' },
];

export function resolveMedia(path?: string | null): string {
  if (!path) return campusHero;
  return PATH_MAP[path] ?? path;
}
