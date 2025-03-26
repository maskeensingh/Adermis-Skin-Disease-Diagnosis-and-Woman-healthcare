import { DefaultSession } from 'next-auth';

// Extend the built-in session types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}

export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  dateJoined: string;
}