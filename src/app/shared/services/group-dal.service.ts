import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Observable, of } from "rxjs";
import { User } from "src/app/models/user";

@Injectable({
  providedIn: "root"
})
export class GroupDALService {
  constructor(public afs: AngularFirestore) {}

  getGroupById(groupId: string): Observable<User> {
    return this.afs
      .collection("groups")
      .doc(groupId)
      .valueChanges();
  }
}
