export interface Activity {
    user: any;
    activityType: string;
    date?: string | null;
    id: number;
    description: string;
    userId: number; // Foreign key to User
  }