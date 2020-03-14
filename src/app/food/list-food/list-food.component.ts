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
  stillLoading = true;
  food$: Observable<Food[]>;
  measurements: any;
  foodAndMeasurements: {};
  subscriptions: Subscription[];
  statement = 'No food found!';
  subscription;
  constructor(private router: Router, private foodService: FoodDALService) {}

  ngOnInit() {
    this.food$ = this.foodService.getAllFood().pipe();
    setTimeout(() => {
      this.stillLoading = false;
    }, 3000);
  }

  goToAddFoodComponent() {
    this.router.navigate(['food/create']);
  }

  editFoodOpen(food: Food) {
    this.router.navigate(['food/update', food.id]);
    this.foodService.tempFood = food;
  }
}
