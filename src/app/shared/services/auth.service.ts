import { Injectable, OnChanges } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { UserModel } from 'src/app/models/user';
import { GroupDALService } from './group-dal.service';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  constructor(
    public afAuth: AngularFireAuth,
    private groupService: GroupDALService
  ) {
    this.afAuth.authState.subscribe((res) => {
      if (res && res.uid) {
        this.user$ = of(res);
        this.setPersistence();
      } else {
        this.user$ = null;
        this.groupService.deleteGroupId();
      }
    });
  }

  setPersistence() {
    this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.groupService.deleteGroupId();
    });
  }
}
