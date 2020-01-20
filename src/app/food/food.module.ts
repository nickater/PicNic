import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateFoodComponent } from './create-food/create-food.component';
import { ListFoodComponent } from './list-food/list-food.component';
import { UpdateFoodComponent } from './update-food/update-food.component';
import { DeleteFoodComponent } from './delete-food/delete-food.component';
import { FoodRoutingModule } from './food-routing.module';

@NgModule({
  declarations: [
    CreateFoodComponent,
    ListFoodComponent,
    UpdateFoodComponent,
    DeleteFoodComponent
  ],
  imports: [CommonModule, FoodRoutingModule]
})
export class FoodModule {}
