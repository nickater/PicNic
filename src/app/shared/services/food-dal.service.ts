import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Food } from 'src/app/models/food';

@Injectable({
  providedIn: 'root'
})
export class FoodDALService {
  groupId = localStorage.getItem('groupId');
  collection = this.afs
    .collection('groups')
    .doc(this.groupId)
    .collection('food');

  constructor(private afs: AngularFirestore) {}

  getAllFood(): Observable<any[]> {
    return this.collection.valueChanges();
  }

  getFoodById(id: string) {
    return this.collection.doc(id);
  }

  addNewFood(food: Food) {
    food.dateAdded = new Date();
    console.log(food);
    console.log(this.groupId);
    return this.collection.add(food);
  }

  updateFoodById(food: Food) {
    return this.collection.doc(food.id).set(food, { merge: true });
  }

  deleteFoodById(id: string) {
    return this.collection.doc(id).delete();
  }
}
