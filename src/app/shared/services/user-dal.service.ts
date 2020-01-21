import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { GroupDALService } from './group-dal.service';
import { AuthService } from './auth.service';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDalService {
  groupId: string;

  constructor(
    public afs: AngularFirestore,
    groupService: GroupDALService,
    private auth: AuthService
  ) {
    this.groupId = groupService.groupId;
  }

  addUserToAuth(user: User): any {
    return this.auth.emailRegistration(user);
  }

  getUserById(id: string) {
    return this.afs
      .collection('groups')
      .doc(this.groupId)
      .collection('users')
      .doc(id)
      .valueChanges();
  }

  async registerUser(user: User) {
    await this.afs
      .collection('groups')
      .doc(user.groupId)
      .collection('users')
      .doc(user.id)
      .set(user)
      .catch((err) => {
        console.error(err);
      });
  }

  async addUserToAllUsers(user: User) {
    try {
      await this.afs
        .collection('allUsers')
        .doc(user.email)
        .set({
          groupId: user.groupId,
          uid: user.id
        });
    } catch (err) {
      console.error(err);
    }
  }

  retrieveGroupIdByEmail(email: string) {
    return this.afs
      .collection('allUsers')
      .doc(email)
      .valueChanges();
  }
}
