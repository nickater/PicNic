import { Component, OnInit } from '@angular/core';
import { FoodDALService } from 'src/app/shared/services/food-dal.service';
import { Food } from 'src/app/models/food';
import { MatDialog } from '@angular/material';
import { CreateFoodComponent } from '../create-food/create-food.component';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-list-food',
  templateUrl: './list-food.component.html',
  styleUrls: ['./list-food.component.scss']
})
export class ListFoodComponent implements OnInit {
  food: Food[];
  foodCount: number;
  now;

  constructor(private dialog: MatDialog, private foodService: FoodDALService) {}

  ngOnInit() {
    this.foodService.getAllFood().subscribe((res) => {
      this.food = res;
      this.foodCount = res.length;
      console.log(res);
    });
  }

  openAddFoodModal() {
    this.dialog.open(CreateFoodComponent);
  }
}
