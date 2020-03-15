import { Food } from './food';
import { UserModel } from './user';
import { Note } from './note';

export interface Event {
  id: string;
  name: string;
  startDate: any;
  endDate: any;
  plannedMeals?:
    | [
        {
          dayNumber: number;
          breakfast: [
            {
              id: string;
              name: string;
            }
          ];
          lunch: [
            {
              id: string;
              name: string;
            }
          ];
          dinner: [
            {
              id: string;
              name: string;
            }
          ];
        }
      ]
    | any;
  attendees?: UserModel[];
  notes?: Note[];
  duration: number;
}

export interface PlannedMeal {
  dayNumber: number;
  breakfast: [
    {
      id: string;
      name: string;
    }
  ];
  lunch: [
    {
      id: string;
      name: string;
    }
  ];
  dinner: [
    {
      id: string;
      name: string;
    }
  ];
}
