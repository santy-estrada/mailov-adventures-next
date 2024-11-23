export interface Partnership {
    id: number;
    user1Id: number; // Foreign key to User
    user2Id: number; // Foreign key to User
    status: string; // Example: 'accepted', 'pending', etc.
  }