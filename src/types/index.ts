export interface ProjectData {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  techStack: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface SkillData {
  id: string;
  name: string;
  category: string;
  proficiencyLevel: number;
  iconName: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CertificateData {
  id: string;
  courseName: string;
  issuer: string;
  issueDate: string;
  credentialUrl: string | null;
  imageUrl: string | null;
  skillsLearned: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MessageData {
  id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}
