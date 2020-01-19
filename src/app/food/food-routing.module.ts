import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListFoodComponent } from './list-food/list-food.component';
import { CreateFoodComponent } from './create-food/create-food.component';
import { UpdateFoodComponent } from './update-food/update-food.component';
import { DeleteFoodComponent } from './delete-food/delete-food.component';

const childRoutes: Routes = [
  {
    path: 'food',
    children: [
      { path: '', component: ListFoodComponent },
      { path: 'create', component: CreateFoodComponent },
      { path: 'update', component: UpdateFoodComponent },
      { path: 'delete', component: DeleteFoodComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class FoodRoutingModule {}
