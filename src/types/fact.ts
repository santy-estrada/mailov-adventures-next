export interface Fact {
    id: number;
    content: string;
    userId: number; // Foreign key to User
  }