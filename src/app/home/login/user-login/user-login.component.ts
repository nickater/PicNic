import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserDalService } from 'src/app/shared/services/user-services/user-dal.service';
import { GroupDALService } from 'src/app/shared/services/group-dal.service';
import { Router } from '@angular/router';
import { AuthProvider } from 'ngx-auth-firebaseui';
import { MatDialog } from '@angular/material';
import { ErrorPromptComponent } from '../error-prompt/error-prompt.component';
import { UserModel } from 'src/app/models/user';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;
  providers = AuthProvider;

  constructor(
    private userService: UserDalService,
    private groupService: GroupDALService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {}

  onSubmit(user: Partial<UserModel>) {
    try {
      this.userService.retrieveGroupIdByEmail(user).subscribe((res: any) => {
        if (this.groupService.doesGroupExist(res.groupId)) {
          this.router.navigate(['group']);
          this.groupService.groupId = res.groupId;
          this.groupService.storeGroupId(res.groupId);
        } else {
          this.router.navigate(['initialForm']);
          this.userService.mapToUser(user);
        }
        sessionStorage.setItem('isLoggedIn', 'true');
      });
    } catch (err) {
      console.error('userLogin - onSubmit - ', err);
    }
  }

  errorUserPrompt(event) {
    this.dialog.open(ErrorPromptComponent);
  }

  onCancel() {
    this.loginForm.reset();
    this.router.navigate(['/']);
  }

  goToRegistration() {
    this.router.navigate(['register']);
  }
}
