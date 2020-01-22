import { Component, OnInit, Inject } from '@angular/core';
import { FoodDALService } from 'src/app/shared/services/food-dal.service';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogConfig
} from '@angular/material';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MeasurementDalService } from 'src/app/shared/services/measurement-dal.service';
import { Ingredient } from 'src/app/models/ingredient';
import { CreateMeasurementComponent } from '../measurement/create-measurement/create-measurement.component';
import { Food } from 'src/app/models/food';
import { Measurement } from 'src/app/models/measurement';

@Component({
  selector: 'app-update-food',
  templateUrl: './update-food.component.html',
  styleUrls: ['./update-food.component.scss']
})
export class UpdateFoodComponent implements OnInit {
  editFoodForm: FormGroup;
  measurements: Measurement[];
  food: Food = {
    id: '',
    lastUsed: '',
    addedBy: '',
    name: '',
    description: '',
    ingredients: [
      {
        name: '',
        quantity: null,
        unit: ''
      }
    ]
  };

  constructor(
    private fs: FoodDALService,
    private dialogRef: MatDialogRef<UpdateFoodComponent>,
    private fb: FormBuilder,
    private measurementService: MeasurementDalService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.editFoodForm = this.fb.group({
      id: this.data.food.id,
      name: this.data.food.name,
      description: this.data.food.description ? this.data.food.description : '',
      ingredients: this.fb.array([this.addIngredientGroup()])
    });

    this.editFood(this.data.food);
    this.measurementService.allMeasurements.subscribe((res) => {
      this.measurements = this.measurementService.mapMeasurements(res);
    });

    this.editFoodForm.valueChanges.subscribe((res) => {
      this.food = res;
    });
  }

  addIngredientGroup(): FormGroup {
    return this.fb.group({
      name: '',
      quantity: null,
      unit: ''
    });
  }

  get ingredientForms() {
    return this.editFoodForm.get('ingredients') as FormArray;
  }

  addIngredientButtonClick(): void {
    (this.editFoodForm.get('ingredients') as FormArray).push(
      this.addIngredientGroup()
    );
  }

  editFood(food: Food) {
    this.editFoodForm.patchValue({
      name: food.name,
      description: food.description ? food.description : ''
    });

    this.editFoodForm.setControl(
      'ingredients',
      this.setExistingIngredients(food.ingredients)
    );
  }

  setExistingIngredients(ingredients: Ingredient[]): FormArray {
    const formArray = new FormArray([]);
    ingredients.forEach((ing) => {
      formArray.push(
        this.fb.group({
          name: ing.name,
          quantity: ing.quantity,
          unit: ing.unit
        })
      );
    });
    return formArray;
  }

  deleteIngredient(i) {
    this.ingredientForms.removeAt(i);
  }

  addNewUnit() {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(CreateMeasurementComponent, dialogConfig);
  }

  submitHandler() {
    this.fs.editFood(this.food);
    this.dialogRef.close();
  }

  cancelHandler() {
    this.dialogRef.close();
  }
}
