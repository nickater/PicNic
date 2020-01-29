import { Food } from './food';
import { User } from './user';
import { Note } from './note';

export interface Event {
  id: string;
  name: string;
  startDate: any;
  endDate: any;
  plannedMeals?: [
    {
      dayNumber: number;
      meals: [
        {
          mealTime: 'breakfast' | 'lunch' | 'dinner';
          food: Food[];
        }
      ];
    }
  ];
  attendees?: User[];
  notes?: Note[];
  duration: number;
}
