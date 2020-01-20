import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Group } from 'src/app/models/group';

@Injectable({
  providedIn: 'root'
})
export class GroupDALService {
  group: Observable<any>;
  constructor(public afs: AngularFirestore) {
    this.group = this.getGroupById(this.groupId);
  }

  storeGroupId(groupId: string) {
    localStorage.setItem('groupId', groupId);
  }

  getGroupById(groupId: string): Observable<any> {
    console.log(groupId);
    return this.afs
      .collection('groups')
      .doc(groupId)
      .collection('users', (ref) => ref.orderBy('birthday', 'asc'))
      .valueChanges();
  }

  addNewGroup(groupId: string) {
    this.afs.collection('groups').doc(groupId);
  }

  get groupId(): string {
    return localStorage.getItem('groupId');
  }

  set groupId(groupId: string) {
    localStorage.setItem('groupId', groupId);
  }

  deleteGroupId() {
    localStorage.removeItem('groupId');
  }
}
