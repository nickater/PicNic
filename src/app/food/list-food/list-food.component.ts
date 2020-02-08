import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Food } from 'src/app/models/food';
import { FoodDALService } from 'src/app/shared/services/food-dal.service';
import { CreateFoodComponent } from '../create-food/create-food.component';
import { MeasurementDalService } from 'src/app/shared/services/measurement-dal.service';
import { Observable, of, Subscription } from 'rxjs';
import { Measurement } from 'src/app/models/measurement';
import { UpdateFoodComponent } from '../update-food/update-food.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-food',
  templateUrl: './list-food.component.html',
  styleUrls: ['./list-food.component.scss']
})
export class ListFoodComponent implements OnInit {
  food$: Observable<Food[]>;
  measurements: any;
  foodAndMeasurements: {};
  subscriptions: Subscription[];

  subscription;
  constructor(private router: Router, private foodService: FoodDALService) {}

  ngOnInit() {
    this.food$ = this.subscription = this.foodService.getAllFood();
  }

  goToAddFoodComponent() {
    this.router.navigate(['food/create']);
  }

  editFoodOpen(food: Food) {
    console.log(food.id);
    this.router.navigate(['food/update', food.id]);
    this.foodService.tempFood = food;
  }
}
