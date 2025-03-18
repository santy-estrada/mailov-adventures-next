export interface Restaurant {
    id: string;
    name: string;
    location: string;
    cuisineType: string;
    dateAdded: string;
    extraInfo: string;
    visited: boolean;
    active?: boolean; // Add the active property
  }