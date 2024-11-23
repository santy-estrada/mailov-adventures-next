export interface DateIdea {
    id: number;
    idea: string;
    category: string;
    enthusiasm: number;
    done: boolean;
    review: string | null;
    dateAdded: string;
    userId: number; // Foreign key to User
  }