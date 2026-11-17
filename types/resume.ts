// 이력서 데이터(JSON) 스키마 정의

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  motto?: string;
  email: string;
  resumePdf?: string;
  links: { label: string; url: string }[];
}

export interface About {
  summary: string[];
  philosophy: string;
  strengths: string[];
  /** 소개 섹션(시세표 아래)에 표시할 바로가기 웹사이트 (선택) */
  featuredSite?: FeaturedSite;
}

export interface FeaturedSite {
  title: string;
  description: string;
  url: string;
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
  href?: string; // 사이트 내부 상세 페이지 경로
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

// 어플 개발 프로그램 목록 (Supabase resume_programs 테이블)
export interface Program {
  id: string;
  position: number;
  name: string;
  description: string;
  url: string;
}
