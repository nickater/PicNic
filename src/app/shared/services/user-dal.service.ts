import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { GroupDALService } from './group-dal.service';
import { AuthService } from './auth.service';
import { flatMap, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDalService {
  groupId: string;
  user: any = {};

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
    await this.updateUserData(user);
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

  retrieveGroupIdByEmail(user) {
    try {
      return this.afs
        .collection('allUsers')
        .doc(user.email)
        .valueChanges()
        .pipe(first());
    } catch (error) {
      this.addUserToAllUsers(user);
    }
  }

  private updateUserData(user) {
    console.log('updateUserData');
    console.log(user);
    const userRef: AngularFirestoreDocument<User> = this.afs
      .collection('groups')
      .doc(user.groupId)
      .collection('users')
      .doc(user.id !== '' ? user.id : user.id);
    const data: User = {
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
        : false
    };

    return userRef.set(data, { merge: true });
  }
}
