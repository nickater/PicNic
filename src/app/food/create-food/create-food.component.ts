import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { FoodDALService } from 'src/app/shared/services/food-dal.service';
import { Measurement } from 'src/app/models/measurement';
import { MatDialogRef } from '@angular/material';
import { MeasurementDalService } from 'src/app/shared/services/measurement-dal.service';

@Component({
  selector: 'app-create-food',
  templateUrl: './create-food.component.html',
  styleUrls: ['./create-food.component.scss']
})
export class CreateFoodComponent implements OnInit {
  addFoodForm: FormGroup;
  measurements: Measurement[] = [];

  constructor(
    private foodService: FoodDALService,
    private fb: FormBuilder,
    private measurementService: MeasurementDalService,
    private dialogRef: MatDialogRef<CreateFoodComponent>
  ) {}

  ngOnInit() {
    this.addFoodForm = this.fb.group({
      name: '',
      description: '',
      ingredients: this.fb.array([this.addIngredientGroup()])
    });

    this.measurementService.getMeasurements().subscribe((measurements) => {
      this.measurements = measurements;
    });
  }

  get ingredientForm() {
    return this.addFoodForm.get('ingredients') as FormArray;
  }

  addIngredientGroup(): FormGroup {
    return this.fb.group({
      name: '',
      quantity: null,
      unit: ''
    });
  }

  addIngredientButtonClick(): void {
    (this.addFoodForm.get('ingredients') as FormArray).push(
      this.addIngredientGroup()
    );
  }

  deleteIngredient(i) {
    this.ingredientForm.removeAt(i);
  }

  submitHandler() {
    console.log(this.addFoodForm.value);
    this.foodService.addNewFood(this.addFoodForm.value);
    this.dialogRef.close();
  }
  cancelHandler() {
    this.dialogRef.close();
  }
}
