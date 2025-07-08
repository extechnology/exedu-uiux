// src/api/types.ts
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
}

export interface RegisterResponse {
  message: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface verifyOtpRequest {
  email: string;
  otp: string;
  username: string;
  password: string;
}

export interface SectionImage {
  id: number;
  section: string;
  image: string; 
}

export interface CourseProps {
  course : string
}

export interface Course {
  id: number;
  title: string;
  sub_title: string;
  description: string;
  image: string;
}

export interface HeroCourse {
  id: number;
  title: string;
  sub_title: string;
  description: string;
  image: string;
  course: string
}

export interface CourseDetail {
  id: number;
  title: string;
  course: string
  description: string;
  main_image: string;
  second_image: string;
  third_image:string
  points: string[];
  keyPoints: string[];
  specialties: string[];
}


export interface Certificate {
  file: File | null;
  description: string;
}

export interface FormDataState {
  profileImage: File | null;
  name: string;
  email: string;
  phoneNumber: string;
  secondarySchool: string;
  secondaryYear: string;
  university: string;
  universityMajor: string;
  universityYear: string;
  careerObjective: string;
  skills: string;
  experience: string;
  interests: string;
}

export interface ProfileModalProps {
  initialProfile: Profile | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void | Promise<void>;
}


export type StudentCertificates = {
  id: number;
  file: string;
  description: string;
  profile: number;
};

export interface Profile  {
  id: number;
  certificates: StudentCertificates[];
  unique_id: string;
  name: string;
  email: string;
  profile_image: string;
  clerk_user_id: string;
  phone_number: string;
  secondary_school: string;
  secondary_year: string;
  university: string;
  university_major: string;
  university_year: string;
  career_objective: string;
  skills: string;
  experience: string;
  interests: string;
};
