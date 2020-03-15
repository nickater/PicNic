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

  setGroupIdToLowerCase() {
    if (!this.isNewGroup) {
      this.registrationForm.value.groupId = this.registrationForm.value.groupId.toLowerCase();
    } else {
      this.registrationForm.value.groupId = this.registrationForm.value.groupId.toLowerCase();
    }
  }

  setToTitleCase = (name: string) =>
    name.charAt(0).toUpperCase() + name.slice(1);

  storeGroupId(groupId: string) {
    return (this.groupService.groupId = groupId);
  }

  onSubmit() {
    this.setGroupIdToLowerCase();
    const formValue = this.registrationForm.value;
    this.combineUser();
    try {
      if (this.isNewGroup) {
        this.groupExists(formValue.newGroupId).then((res) => {
          if (!res) {
            this.groupService.addNewGroup(
              formValue.newGroupId,
              formValue.newGroupIdPassword
            );
            this.userService.registerUser(this.combinedUser);
            this.navigateToGroup();
          } else {
            alert('Group Already Exists');
            this.registrationForm.get('groupCredentials').reset();
          }
        });
      } else {
        this.qualifiedUser(formValue).then((res) => {
          if (res) {
            this.navigateToGroup();
          } else {
            alert('Incorrect Group Credentials!');
          }
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
    const tempUser = this.user;
    this.user = {
      firstName: this.registrationForm.value.firstName,
      lastName: this.registrationForm.value.lastName,
      groupId: this.registrationForm.value.groupId,
      email: tempUser.email,
      birthday: this.registrationForm.value.birthday,
      portion: this.registrationForm.value.portion
    };
    if (!this.isNewGroup) {
      this.isNewGroup = !this.isNewGroup;
      this.registrationForm = this.formBuilder.buildCustomNewGroupForm(
        this.user
      );
    } else {
      this.user.groupId = this.registrationForm.value.groupCredentials.newGroupId;
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
