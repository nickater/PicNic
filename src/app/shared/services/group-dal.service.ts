import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { UserModel } from 'src/app/models/user';
import { Group } from 'src/app/models/group';

@Injectable({
  providedIn: 'root'
})
export class GroupDALService {
  group: Observable<any>;
  localGroupId: string;
  groupId: string;

  constructor(public afs: AngularFirestore) {}

  storeGroupId(groupId: string) {
    sessionStorage.setItem('groupId', groupId);
  }

  getGroupById(groupId: string): Observable<UserModel[]> {
    return this.afs
      .collection('groups')
      .doc(groupId)
      .collection<UserModel>('users', (ref) => ref.orderBy('birthday', 'asc'))
      .valueChanges();
  }

  addNewGroup(groupId: string, password: string) {
    this.afs
      .collection('groups')
      .doc(groupId)
      .set({
        password: password
      });
  }

  doesGroupExist(groupId: string): Promise<boolean> {
    const groupRef = this.afs.collection('groups').doc(groupId);
    return groupRef
      .get()
      .toPromise()
      .then((doc) => {
        return doc.exists;
      });
  }

  doesGroupPasswordMatch(groupId, groupPassword) {
    let passwordMatches = false;
    const groupRef = this.afs.collection('groups').doc(groupId);
    debugger;
    return groupRef
      .get()
      .toPromise()
      .then((doc) => {
        const password = doc.get('password');
        if (groupPassword === password) {
          return true;
        } else {
          return false;
        }
      });
  }

  deleteGroupId() {
    this.groupId = undefined;
    sessionStorage.removeItem('groupId');
    sessionStorage.removeItem('isLoggedIn');
  }
}
