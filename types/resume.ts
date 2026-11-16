// 이력서 데이터(JSON) 스키마 정의

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  email: string;
  resumePdf?: string;
  links: { label: string; url: string }[];
}

export interface About {
  summary: string[];
  philosophy: string;
  strengths: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  demoUrl?: string;
  githubUrl?: string;
  image?: string;
}

export interface Education {
  school: string;
  major: string;
  period: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface Resume {
  profile: Profile;
  about: About;
  skills: SkillGroup[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
  lastUpdated: string;
}
