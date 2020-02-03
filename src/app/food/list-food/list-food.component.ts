import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Food } from 'src/app/models/food';
import { FoodDALService } from 'src/app/shared/services/food-dal.service';
import { CreateFoodComponent } from '../create-food/create-food.component';
import { MeasurementDalService } from 'src/app/shared/services/measurement-dal.service';
import { Observable, of } from 'rxjs';
import { Measurement } from 'src/app/models/measurement';
import { UpdateFoodComponent } from '../update-food/update-food.component';

@Component({
  selector: 'app-list-food',
  templateUrl: './list-food.component.html',
  styleUrls: ['./list-food.component.scss']
})
export class ListFoodComponent implements OnInit, OnDestroy {
  food: Food[];
  foodCount: number;
  measurements: any;
  foodAndMeasurements: {};
  subscription;
  constructor(
    private dialog: MatDialog,
    private foodService: FoodDALService,
    private measurementService: MeasurementDalService
  ) {}

  ngOnInit() {
    this.subscription = this.foodService.getAllFood().subscribe((res) => {
      this.food = res;
      this.foodCount = res.length;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openAddFoodModal() {
    this.dialog.open(CreateFoodComponent);
  }

  editFoodOpen(food: any) {
    const dialogConfig = new MatDialogConfig();
    this.measurementService.allMeasurements.subscribe((res) => {
      this.measurements = this.measurementService.mapMeasurements(res);
    });
    this.foodAndMeasurements = {
      food,
      measurements: this.measurements
    };

    dialogConfig.data = this.foodAndMeasurements;
    this.dialog.open(UpdateFoodComponent, dialogConfig);
  }
}
