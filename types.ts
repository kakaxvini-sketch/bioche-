
export type Grade = 6 | 7 | 8 | 9 | 10;
export type Subject = 'Biology' | 'Chemistry';

export interface User {
  name: string;
  email: string;
  grade: Grade;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Topic {
  id: string;
  title: string;
  grade: Grade;
  subject: Subject;
  description: string;
  content: string;
  fact?: string;
  quiz?: QuizQuestion[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
