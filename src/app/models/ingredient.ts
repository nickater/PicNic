export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

export interface IngredientChoice {
  name: string;
  isLiquid?: boolean;
  popularity?: number;
  lastMealUsedFor?: string;
}
