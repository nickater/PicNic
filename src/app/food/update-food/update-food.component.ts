import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
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
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-food',
  templateUrl: './update-food.component.html',
  styleUrls: ['./update-food.component.scss']
})
export class UpdateFoodComponent implements OnInit, OnDestroy {
  editFoodForm: FormGroup;
  measurements: Measurement[];
  measurement$: any;
  food: Observable<Food>;

  constructor(
    private fs: FoodDALService,
    private fb: FormBuilder,
    private measurementService: MeasurementDalService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    let id;
    this.route.params.subscribe((res) => {
      id = res.id;
    });
    this.fs.getSingleFood(id).subscribe((food) => {
      this.editFoodForm = this.fb.group({
        id: id,
        name: food.name,
        description: food.description ? food.description : '',
        ingredients: this.fb.array([this.addIngredientGroup()])
      });

      this.editFood(food);
    });
    this.measurement$ = this.measurementService.allMeasurements.subscribe(
      (res) => {
        this.measurements = this.measurementService.mapMeasurements(res);
      }
    );
  }

  ngOnDestroy() {
    this.measurement$.unsubscribe();
  }

  getFoodForUpdate(id: string) {
    return this.fs.getSingleFood(id);
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
    let dialogConfig = new MatDialogConfig();
    dialogConfig = {
      width: '80%',
      height: '40%'
    };
    this.dialog.open(CreateMeasurementComponent, dialogConfig);
  }

  submitHandler() {
    console.log('this.editFoodForm.value:', this.editFoodForm.value);
    this.fs.editFood(this.editFoodForm.value);
    this.router.navigate(['food']);
  }

  cancelHandler() {
    this.router.navigate(['food']).then(() => {
      this.editFoodForm.reset();
    });
  }
}
