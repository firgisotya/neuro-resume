export type ExperienceType = {
  id?: number;
  docId?: number | null;
  title: string | null;
  companyName: string | null;
  city: string | null;
  state: string | null;
  startDate: string | null;
  endDate?: string | null;
  currentlyWorking: boolean;
  workSummary: string | null;
};

export type EducationType = {
  id?: number;
  docId?: number | null;
  universityName: string | null;
  startDate: string | null;
  endDate: string | null;
  degree: string | null;
  major: string | null;
  description: string | null;
};

export type ProjectType = {
  id?: number;
  docId?: number | null;
  title: string | null;
  link: string | null;
  description: string | null;
};

export type CertificateType = {
  id?: number;
  docId?: number | null;
  title: string | null;
  issuer: string | null;
  issueDate: string | null;
}

export type LanguageType = {
  id?: number;
  docId?: number | null;
  name: string | null;
  proficiency?: string | null;
};

export type PersonalInfoType = {
  id?: number;
  docId?: number | null;
  fullName?: string | null;
  jobTitle?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  linkedin?: string | null;
  github?: string | null;
  portfolio?: string | null;
};

export type StatusType = "archived" | "private" | "public" | undefined;

export type ResumeDataType = {
  id?: number;
  documentId?: string;
  title: string;
  status: StatusType;
  thumbnail?: string | null;
  personalInfo?: PersonalInfoType | null;
  currentPosition?: number | null;
  summary: string | null;
  educations?: EducationType[] | null;
  experiences?: ExperienceType[] | null;
  projects?: ProjectType[] | null;
  skill?: string | null;
  certificates?: CertificateType[] | null;
  languages?: LanguageType[] | null;
  updatedAt?: string;
};
