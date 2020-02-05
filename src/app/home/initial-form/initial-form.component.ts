import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupDALService } from 'src/app/shared/services/group-dal.service';
import { UserDalService } from 'src/app/shared/services/user-dal.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/models/user';

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

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private groupService: GroupDALService,
    private userService: UserDalService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      firstName: [this.user.displayName, Validators.required],
      lastName: ['', Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: ['', [Validators.minLength, Validators.required]],
      confirmPass: [''],
      groupId: [''],
      birthday: [new Date(), Validators.required],
      portion: [0, Validators.required]
    });
  }

  checkPasswordsMatch() {
    this.passwordsMatch =
      this.registrationForm.value.password ===
      this.registrationForm.value.confirmPass;
    return this.passwordsMatch;
  }

  convertFormToObject(formValue, userInfo) {
    formValue = this.removePasswordFromObject(formValue);
    console.log(userInfo);
    console.log(formValue);
    let user = {
      ...formValue,
      ...userInfo,
      hasCompletedProfile: true
    };
    console.log('user', user);
    return user;
  }

  removePasswordFromObject(user): User {
    delete user.password;
    delete user.confirmPass;
    return user;
  }

  setGroupIdToLowerCase() {
    this.registrationForm.value.groupId = this.registrationForm.value.groupId.toLowerCase();
  }

  storeGroupId(groupId: string) {
    return (this.groupService.groupId = groupId);
  }

  onSubmit() {
    this.setGroupIdToLowerCase();
    this.storeGroupId(this.registrationForm.value.groupId);
    const combinedUser = this.convertFormToObject(
      this.registrationForm.value,
      this.userService.user
    );
    this.userService.registerUser(combinedUser).then(() => {
      this.userService.addUserToAllUsers(combinedUser);
      this.router.navigate(['group']).then(() => {
        this.registrationForm.reset();
      });
    });
  }

  ngOnDestroy(): void {}

  toggleNewGroup() {
    this.isNewGroup = !this.isNewGroup;
  }

  onCancel() {
    this.auth.afAuth.auth.signOut().then(() => {
      this.router.navigate(['']).then(() => this.registrationForm.reset());
    });
  }
}
