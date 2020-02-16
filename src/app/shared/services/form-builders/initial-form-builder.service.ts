import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StringHelperService } from '../string-helper.service';
import { UserModel } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class InitialFormBuilderService {
  constructor(
    private fb: FormBuilder,
    private stringHelper: StringHelperService
  ) {}

  buildCustomForm(user: UserModel): FormGroup {
    try {
      return this.fb.group({
        firstName: [
          this.stringHelper.setToTitleCase(
            this.stringHelper.getFirstName(user.displayName)
          ),
          Validators.required
        ],
        lastName: [
          this.stringHelper.setToTitleCase(
            this.stringHelper.getLastName(user.displayName)
          ),
          Validators.required
        ],
        email: [user.email, [Validators.required, Validators.email]],
        groupId: ['', Validators.required],
        groupIdPassword: ['', Validators.required],
        birthday: [null, Validators.required],
        portion: [0, Validators.required]
      });
    } catch (err) {
      console.error(err);
    }
  }

  buildCustomNewGroupForm(user: UserModel): FormGroup {
    try {
      return this.fb.group({
        firstName: [
          this.stringHelper.setToTitleCase(
            this.stringHelper.getFirstName(user.displayName)
          ),
          Validators.required
        ],
        lastName: [
          this.stringHelper.setToTitleCase(
            this.stringHelper.getLastName(user.displayName)
          ),
          Validators.required
        ],
        email: [user.email, [Validators.required, Validators.email]],
        birthday: [null, Validators.required],
        portion: [0, Validators.required],
        groupCredentials: this.fb.group({
          newGroupId: ['', Validators.required],
          newGroupIdPassword: ['', Validators.required],
          confirmIdPassword: ['', Validators.required]
        })
      });
    } catch (err) {
      console.error(err);
    }
  }

  buildGenericForm(): FormGroup {
    try {
      return this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        groupId: ['', Validators.required],
        birthday: [null, Validators.required],
        portion: [0, Validators.required]
      });
    } catch (err) {
      console.error(err);
    }
  }
}
