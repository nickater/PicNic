import { Ingredient } from './ingredient';

export interface Food {
  id: string;
  name: string;
  ingredients: Ingredient[];
  addedBy?: string;
  dateAdded?: number | Date;
  lastUsed?: number;
}
