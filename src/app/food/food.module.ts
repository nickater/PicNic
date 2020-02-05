import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateFoodComponent } from './create-food/create-food.component';
import { ListFoodComponent } from './list-food/list-food.component';
import { UpdateFoodComponent } from './update-food/update-food.component';
import { DeleteFoodComponent } from './delete-food/delete-food.component';
import { FoodRoutingModule } from './food-routing.module';
import { MaterialModule } from '../shared/angular-material';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateMeasurementComponent } from './measurement/create-measurement/create-measurement.component';

@NgModule({
  declarations: [
    CreateFoodComponent,
    ListFoodComponent,
    UpdateFoodComponent,
    DeleteFoodComponent,
    CreateMeasurementComponent,
    CreateMeasurementComponent
  ],
  imports: [
    CommonModule,
    FoodRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [CreateMeasurementComponent]
})
export class FoodModule {}
