// src/types/user.ts
export interface User {
  uid: string;           // Firebase Auth UID
  email: string;         // User's email
  displayName?: string;  // Optional display name
  createdAt: number;     // Timestamp of account creation
  role?: 'user' | 'admin'; // Optional role for access control
}