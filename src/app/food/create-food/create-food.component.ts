import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Measurement } from '../../models/measurement';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FoodDALService } from 'src/app/shared/services/food-dal.service';
import { MeasurementDalService } from 'src/app/shared/services/measurement-dal.service';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { AreYouSureComponent } from 'src/app/shared/components/are-you-sure/are-you-sure.component';
import { CreateMeasurementComponent } from '../measurement/create-measurement/create-measurement.component';
@Component({
  selector: 'app-create-food',
  templateUrl: './create-food.component.html',
  styleUrls: ['./create-food.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateFoodComponent implements OnInit {
  addFoodForm: FormGroup;
  measurements$: Observable<Measurement[]>;
  measurementSub$ = new ReplaySubject<Measurement[]>();

  constructor(
    private foodService: FoodDALService,
    private fb: FormBuilder,
    private measurementService: MeasurementDalService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.addFoodForm = this.fb.group({
      name: '',
      dateAdded: new Date(),
      lastUsed: null,
      description: '',
      ingredients: this.fb.array([this.addIngredientGroup()])
    });

    this.measurementService
      .combineMeasurements()
      .subscribe((res) => this.measurementSub$.next(res));
  }

  get ingredientForms() {
    return this.addFoodForm.get('ingredients') as FormArray;
  }

  ingredientFormIsValid() {
    return this.ingredientForms.valid;
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

  addNewUnit() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig = {
      width: '80%',
      height: '40%'
    };
    this.dialog.open(CreateMeasurementComponent, dialogConfig);
  }

  submitHandler() {
    this.foodService.addNewFood(this.addFoodForm.value);
    this.router.navigate(['food']);
  }
  cancelHandler(touched) {
    if (touched) {
      this.openAreYouSure();
    } else {
      this.router.navigate(['food']);
    }
  }

  openAreYouSure() {
    const dialogConfig: MatDialogConfig = {
      data: this.addFoodForm.controls.name.value || 'food'
    };
    const dialogRef = this.dialog.open(AreYouSureComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.router.navigate(['food']).then(() => this.addFoodForm.reset());
      }
    });
  }
}
