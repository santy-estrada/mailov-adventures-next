export interface Question {
    id: number;
    question: string;
    userId: number; // Foreign key to User
  }