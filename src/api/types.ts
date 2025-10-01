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

export interface AuthResponse {
  access: string;
  refresh: string;
  username: string;
  email: string;
  user_id: number;
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
  duration: string;
  image: string;
  price: number;
  paid_amount: number;
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
  certificate_file: string;
  description: string;
  profile: number;
};

export interface Profile {
  id: number;
  batch: number;
  certificates: StudentCertificates[];
  unique_id: string;
  name: string;
  user: {
    username: string;
    email: string;
  };
  course: number;
  course_name: string;  
  username: string;
  email: string;
  course_details:Course;
  profile_image: string;
  clerk_user_id: string;
  phone_number: string;
  secondary_school: string;
  secondary_year: string;
  progress:number;
  university: string;
  university_major: string;
  university_year: string;
  career_objective: string;
  skills: string;
  experience: string;
  paid_amount: number;
  interests: string;
  is_public: boolean;
  enrolled_at: string;
  payment_completed:boolean;
};


export interface AttendanceRecord {
  id: number;
  date: string;
  status: string;
  attended_at?: string | null;
  marked_by?: number;
  student_course?: number;
  session_id?: number;
}


export interface Notification {
  id: string;
  title: string;
  message: string;
  type: " LOGIN" | "PROFILE" | "ENQUIRY" | "ADMISSION";
  related_id: number;
  is_read: boolean;
  created_at: string;
  related_model: string;
}


export interface Session {
  id: number;
  title: string;
  course: number | null;
  start_time: string;
  duration: string;
  tutor: number | null;
  students: string[];
  tutor_details: any; 
  student_details: Profile[];
}


export interface StudentWorks {
  id: number;
  title: string;
  description: string;
  link: string;
  image: string;
  student: number;
}