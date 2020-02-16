import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { GroupDALService } from '../group-dal.service';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from 'firebase';
import { UserModel } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserAdapterService {
  constructor(private groupService: GroupDALService) {}
  user: User;
  mapUser(user: Observable<User>): Observable<UserModel> {
    let mappedUser: UserModel;
    return user.pipe(
      map((res) => {
        mappedUser = {
          id: res.uid,
          groupId: this.groupService.groupId,
          email: res.email,
          displayName: res.displayName,
          firstName: res.displayName.split(' ')[0],
          lastName: res.displayName.split(' ')[1],
          photoUrl: res.photoURL,
          accountCreatedOn: new Date()
        };
        return mappedUser;
      })
    );
  }
}

export interface UnmappedUser {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  isAnonymous: boolean;
}
