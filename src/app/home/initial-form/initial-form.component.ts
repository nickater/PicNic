import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupDALService } from 'src/app/shared/services/group-dal.service';
import { UserDalService } from 'src/app/shared/services/user-services/user-dal.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { InitialFormBuilderService } from '../../shared/services/form-builders/initial-form-builder.service';
import { UserModel } from 'src/app/models/user';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-initial-form',
  templateUrl: './initial-form.component.html',
  styleUrls: ['./initial-form.component.scss']
})
export class InitialFormComponent implements OnInit {
  registrationForm: FormGroup;
  passwordsMatch: boolean;
  isNewGroup = false;
  user = this.userService.user;
  combinedUser;
  tempPassword;

  constructor(
    private router: Router,
    private groupService: GroupDALService,
    private userService: UserDalService,
    private auth: AuthService,
    private formBuilder: InitialFormBuilderService,
    private matDialog: MatDialog
  ) {}

  ngOnInit() {
    try {
      this.registrationForm = this.formBuilder.buildCustomForm(this.user);
    } catch (err) {
      console.error(err);
      this.registrationForm = this.formBuilder.buildGenericForm();
    }
  }

  convertFormToObject(formValue, userInfo) {
    const user = {
      ...formValue,
      ...userInfo,
      hasCompletedProfile: true
    };
    return user;
  }

  // get groupCredentials() {
  //   return this.registrationForm.get('groupCredentials') as FormGroup;
  // }

  // get newGroupId() {
  //   return this.registrationForm.get('groupCredentials.groupId')
  // }

  // get newGroupIdPassword() {
  //   return this.registrationForm.get('groupCredentials.groupIdPassword')
  // }

  // get confirmIdPassword() {
  //   return this.registrationForm.get('groupCredentials.confirmIdPassword')
  // }

  setGroupIdToLowerCase = (): void =>
    (this.registrationForm.value.groupId = this.registrationForm.value.groupId.toLowerCase());

  setToTitleCase = (name: string) =>
    name.charAt(0).toUpperCase() + name.slice(1);

  storeGroupId(groupId: string) {
    return (this.groupService.groupId = groupId);
  }

  onSubmit() {
    const formValue = this.registrationForm.value;
    this.combineUser();
    try {
      if (this.isNewGroup) {
        this.groupExists(formValue.groupId).then((res) => {
          if (!res) {
            this.groupService.addNewGroup(
              formValue.groupId,
              formValue.groupIdPassword
            );
            this.userService.registerUser(this.combinedUser);
            this.navigateToGroup();
          } else {
            alert('Group Already Exists');
            this.registrationForm.controls.groupId.reset();
            this.registrationForm.controls.groupIdPassword.reset();
          }
        });
      } else {
        console.log('Made it into the not new group block');
        this.qualifiedUser(formValue).then((res) => {
          res ? this.navigateToGroup() : alert('Incorrect Group Credentials!');
          console.log('Made it into the then block', res);
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  qualifiedUser(formValue) {
    return (
      this.groupExists(formValue.groupId) &&
      this.passwordMatches(formValue.groupId, formValue.groupIdPassword)
    );
  }

  passwordMatches(groupId, groupPassword) {
    return this.groupService.doesGroupPasswordMatch(groupId, groupPassword);
  }

  groupExists(groupId) {
    return this.groupService.doesGroupExist(groupId);
  }

  toggleNewGroup() {
    if (!this.isNewGroup) {
      this.isNewGroup = !this.isNewGroup;
      this.registrationForm = this.formBuilder.buildCustomNewGroupForm(
        this.user
      );
    } else {
      this.isNewGroup = !this.isNewGroup;
      this.registrationForm = this.formBuilder.buildCustomForm(this.user);
    }
  }

  newGroupNewUserSuccessNavigation() {
    if (!this.groupExists) {
      this.userService.registerUser(this.combinedUser).then(() => {
        this.userService.addUserToAllUsers(this.combinedUser);
        this.router.navigate(['group']).then(() => {
          this.registrationForm.reset();
        });
      });
    }
  }

  existingGroupNewUserSuccessNavigation() {}

  navigateToGroup() {
    this.storeGroupId(this.registrationForm.value.groupId);
    this.router.navigate(['group']).then(() => {
      this.registrationForm.reset();
    });
  }

  combineUser() {
    this.combinedUser = this.convertFormToObject(
      this.registrationForm.value,
      this.userService.user
    );
  }

  onCancel() {
    this.auth.afAuth.auth.signOut().then(() => {
      this.router.navigate(['']).then(() => this.registrationForm.reset());
    });
  }
}
