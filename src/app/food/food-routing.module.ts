import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListFoodComponent } from './list-food/list-food.component';
import { CreateFoodComponent } from './create-food/create-food.component';
import { UpdateFoodComponent } from './update-food/update-food.component';
import { DeleteFoodComponent } from './delete-food/delete-food.component';
import { ListIngredientsComponent } from '../ingredients/list-ingredients/list-ingredients.component';
import { CreateIngredientsComponent } from '../ingredients/create-ingredients/create-ingredients.component';
import { UpdateIngredientsComponent } from '../ingredients/update-ingredients/update-ingredients.component';
import { DeleteIngredientsComponent } from '../ingredients/delete-ingredients/delete-ingredients.component';

const childRoutes: Routes = [
  { path: '', component: ListFoodComponent },
  { path: 'create', component: CreateFoodComponent },
  { path: 'update/:id', component: UpdateFoodComponent },
  { path: 'delete', component: DeleteFoodComponent },
  { path: 'ingredients', component: ListIngredientsComponent },
  { path: 'ingredients/create', component: CreateIngredientsComponent },
  { path: 'ingredients/update/:id', component: UpdateIngredientsComponent },
  { path: 'ingredients/delete', component: DeleteIngredientsComponent }
];
@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class FoodRoutingModule {}
