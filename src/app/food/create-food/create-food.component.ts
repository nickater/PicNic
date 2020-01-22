import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Measurement } from '../../models/measurement';
import { MatDialogRef } from '@angular/material';
import { FoodDALService } from 'src/app/shared/services/food-dal.service';
import { MeasurementDalService } from 'src/app/shared/services/measurement-dal.service';
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-create-food',
  templateUrl: './create-food.component.html',
  styleUrls: ['./create-food.component.scss']
})
export class CreateFoodComponent implements OnInit {
  addFoodForm: FormGroup;
  measurements: any = [];

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
    this.measurementService.allMeasurements.subscribe((res) => {
      this.measurements = this.measurementService.mapMeasurements(res);
    });
  }

  get ingredientForms() {
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
    this.ingredientForms.removeAt(i);
  }

  submitHandler() {
    this.foodService.addNewFood(this.addFoodForm.value);
    this.dialogRef.close();
  }
  cancelHandler() {
    this.dialogRef.close();
  }
}
