import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { GroupDALService } from './group-dal.service';
import { IngredientChoice } from 'src/app/models/ingredient';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientDalService {
  constructor(
    private afs: AngularFirestore,
    private groupService: GroupDALService
  ) {}

  getPrivateIngredients(): Observable<IngredientChoice[]> {
    return this.afs
      .collection('groups')
      .doc(this.groupService.groupId)
      .collection<IngredientChoice>('ingredients')
      .valueChanges();
  }

  addPrivateIngredient(ingredient: IngredientChoice): void {
    this.afs
      .collection('groups')
      .doc(this.groupService.groupId)
      .collection('ingredients')
      .add(ingredient);
  }
}
