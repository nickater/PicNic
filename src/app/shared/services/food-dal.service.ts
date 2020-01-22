import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Food } from 'src/app/models/food';
import { AuthService } from './auth.service';
import { GroupDALService } from './group-dal.service';

@Injectable({
  providedIn: 'root'
})
export class FoodDALService {
  food: Observable<any>;
  collection = this.afs
    .collection('groups')
    .doc(this.groupService.groupId)
    .collection('food');

  constructor(
    private afs: AngularFirestore,
    private groupService: GroupDALService
  ) {
    this.food = this.collection.valueChanges({ idField: 'id' });
  }

  getFood() {
    return this.food;
  }

  addNewFood(formValue: any) {
    try {
      this.collection.add(formValue);
    } catch (err) {
      console.error(err);
    }
  }

  editFood(food: Food) {
    try {
      this.collection.doc(food.id).set(food);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteFood(food) {
    await this.collection.doc(food).delete();
  }
}
