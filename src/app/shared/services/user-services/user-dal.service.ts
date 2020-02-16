import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { UserModel } from 'src/app/models/user';
import { GroupDALService } from '../group-dal.service';
import { AuthService } from '../auth.service';
import { flatMap, first } from 'rxjs/operators';
import { UserAdapterService } from './user-adapter.service';

@Injectable({
  providedIn: 'root'
})
export class UserDalService {
  groupId: string;
  user: any = {};

  constructor(
    public afs: AngularFirestore,
    private groupService: GroupDALService,
    private auth: AuthService,
    private userAdapter: UserAdapterService
  ) {
    this.groupId = groupService.groupId;
  }

  getUserById(id: string): Observable<UserModel> {
    return this.afs
      .collection('groups')
      .doc(this.groupId)
      .collection('users')
      .doc<UserModel>(id)
      .valueChanges();
  }

  async registerUser(user: UserModel) {
    this.addUserToAllUsers(user);
    await this.updateUserData(user);
  }

  async addUserToAllUsers(user: UserModel) {
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

  retrieveGroupIdByEmail(user) {
    try {
      return this.afs
        .collection('allUsers')
        .doc(user.email)
        .valueChanges()
        .pipe(first());
    } catch (error) {
      this.addUserToAllUsers(user).then(() => {
        return this.afs
          .collection('allUsers')
          .doc(user.email)
          .valueChanges()
          .pipe(first());
      });
    }
  }

  mapToUser(event) {
    this.user = {
      displayName: event.displayName,
      email: event.email,
      id: event.uid,
      photoUrl: event.photoURL ? event.photoURL : ''
    };
  }

  private updateUserData(user) {
    const userRef = this.afs
      .collection('groups')
      .doc(user.groupId)
      .collection('users')
      .doc<UserModel>(user.id);
    const data: UserModel = {
      id: user.id,
      groupId: user.groupId ? user.groupId : '',
      firstName: user.firstName ? user.firstName : '',
      lastName: user.lastName ? user.lastName : '',
      birthday: user.birthday ? user.birthday : null,
      email: user.email ? user.email : '',
      bio: user.bio ? user.bio : null,
      photoUrl: user.photoUrl ? user.photoUrl : null,
      displayName: user.displayName ? user.displayName : null,
      portion: user.portion ? user.portion : 1,
      isAdmin: user.isAdmin ? user.isAdmin : false,
      recipesContributed: user.recipesContributed ? user.recipesContributed : 0,
      eventsAttended: user.eventsAttended ? user.eventsAttended : 0,
      hasCompletedProfile: user.hasCompletedProfile
        ? user.hasCompletedProfile
        : false,
      accountCreatedOn: new Date()
    };

    return userRef.set(data, { merge: true });
  }
}
