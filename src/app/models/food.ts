import { Ingredient } from './ingredient';

export interface Food {
  id: string;
  name: string;
  lastUsed: any;
  ingredients: Ingredient[];
  addedBy?: string;
  description?: string;
}
