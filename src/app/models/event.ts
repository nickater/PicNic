import { Food } from './food';
import { User } from './user';

export interface Event {
  name: string;
  startDate: Date;
  endDate: Date;
  plannedMeals: [
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
  attendees: User[];
}
