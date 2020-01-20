import { Injectable, OnChanges } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { GroupDALService } from './group-dal.service';
import { UserDalService } from './user-dal.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private groupService: GroupDALService
  ) {
    this.afAuth.authState.subscribe((res) => {
      if (res && res.uid) {
        this.user$ = of(res);
        console.log('user is logged in');
      } else {
        this.user$ = null;
        console.log('user is logged out');
      }
    });
  }

  emailRegistration(user: User) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .catch((err) => {
        console.error(err);
      });
  }

  emailLogin(user: User): any {
    return this.afAuth.auth.signInWithEmailAndPassword(
      user.email,
      user.password
    );
  }

  logout() {
    this.afAuth.auth.signOut().then((cred) => {
      this.groupService.deleteGroupId();
      console.log('You logged out');
    });
  }
}
