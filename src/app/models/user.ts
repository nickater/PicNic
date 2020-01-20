import { Timestamp } from 'rxjs/internal/operators/timestamp';

export interface User {
  id: string;
  groupId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthday: number;
  portion: number;
  eventsAttended: number;
}
