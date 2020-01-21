import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserDalService } from 'src/app/shared/services/user-dal.service';
import { GroupDALService } from 'src/app/shared/services/group-dal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserDalService,
    private groupService: GroupDALService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: '',
      password: ''
    });
  }

  async onSubmit() {
    await this.authService.emailLogin(this.loginForm.value).then((cred) => {
      this.userService
        .retrieveGroupIdByEmail(cred.user.email)
        .subscribe((res: any) => {
          this.groupService.groupId = res.groupId;
          this.router.navigate(['group']);
        });
    });
  }

  onCancel() {
    this.loginForm.reset();
    this.router.navigate(['/']);
  }
}
