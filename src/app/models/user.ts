import { Timestamp } from 'rxjs/internal/operators/timestamp';

export interface User {
  id: string;
  groupId: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  email: string;
  photoUrl?: string;
  password?: string;
  birthday?: number;
  portion?: number;
  bio?: string;
  eventsAttended?: number;
  recipesContributed?: number;
  isAdmin?: boolean;
  hasCompletedProfile?: boolean;
}
