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
import { SharedComponentsModule } from '../shared/shared-components.module';
import { CreateIngredientsComponent } from '../ingredients/create-ingredients/create-ingredients.component';
import { ListIngredientsComponent } from '../ingredients/list-ingredients/list-ingredients.component';
import { UpdateIngredientsComponent } from '../ingredients/update-ingredients/update-ingredients.component';
import { DeleteIngredientsComponent } from '../ingredients/delete-ingredients/delete-ingredients.component';
import { IngredientChoiceComponent } from '../shared/components/ingredient-choice/ingredient-choice.component';
@NgModule({
  declarations: [
    CreateFoodComponent,
    ListFoodComponent,
    UpdateFoodComponent,
    DeleteFoodComponent,
    CreateMeasurementComponent,
    CreateMeasurementComponent,
    CreateIngredientsComponent,
    ListIngredientsComponent,
    UpdateIngredientsComponent,
    DeleteIngredientsComponent,
    IngredientChoiceComponent,
  ],
  imports: [
    CommonModule,
    FoodRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedComponentsModule,
  ],
  entryComponents: [CreateMeasurementComponent],
})
export class FoodModule {}
