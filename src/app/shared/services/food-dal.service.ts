import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Food } from 'src/app/models/food';
import { AuthService } from './auth.service';
import { GroupDALService } from './group-dal.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FoodDALService {
  tempFood: Food;
  food: Observable<any>;
  collection = this.afs
    .collection('groups')
    .doc(this.groupService.groupId)
    .collection<Food>('food');

  constructor(
    private afs: AngularFirestore,
    private groupService: GroupDALService
  ) {}

  getAllFood() {
    return this.collection.valueChanges().pipe(
      map((res) => {
        let array;
        if (res.length === 0) {
          array = undefined;
        } else {
          array = res;
        }
        return array;
      })
    );
  }

  getSingleFood(id: string): Observable<Food> {
    return this.collection.doc<Food>(id).valueChanges();
  }

  addNewFood(formValue: Food) {
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
