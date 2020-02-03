import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ControlContainer
} from '@angular/forms';
import { GroupDALService } from 'src/app/shared/services/group-dal.service';
import { UserDalService } from 'src/app/shared/services/user-dal.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CreateGroupComponent } from '../../../group/create-group/create-group.component';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit, OnDestroy {
  registrationForm: FormGroup;
  passwordsMatch: boolean;
  isNewGroup = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private groupService: GroupDALService,
    private userService: UserDalService
  ) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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

  convertFormToObject(formValue, uId) {
    formValue = this.removePasswordFromObject(formValue);

    return {
      ...formValue,
      id: uId
    };
  }

  removePasswordFromObject(user) {
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
    this.userService.addUserToAuth(this.registrationForm.value).then((res) => {
      const combinedUser = this.convertFormToObject(
        this.registrationForm.value,
        res.user.uid
      );
      this.userService.registerUser(combinedUser).then(() => {
        this.userService.addUserToAllUsers(combinedUser);
        this.router.navigate(['group']).then(() => {
          this.registrationForm.reset();
        });
      });
    });
  }

  ngOnDestroy(): void {}

  toggleNewGroup() {
    this.isNewGroup = !this.isNewGroup;
  }

  onCancel() {
    this.registrationForm.reset();
    this.router.navigate(['group']);
  }
}
