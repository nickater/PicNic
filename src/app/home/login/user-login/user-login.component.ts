import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserDalService } from 'src/app/shared/services/user-dal.service';
import { GroupDALService } from 'src/app/shared/services/group-dal.service';
import { Router } from '@angular/router';
import { AuthProvider } from 'ngx-auth-firebaseui';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;
  providers = AuthProvider;

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

  onSubmit(event) {
    console.log('uid:', event.uid);
    try {
      this.userService.retrieveGroupIdByEmail(event).subscribe((res: any) => {
        if (res !== undefined) {
          this.groupService.groupId = res.groupId;
          this.router.navigate(['group']);
        } else {
          this.router.navigate(['initialForm']);
          this.userService.user = {
            displayName: event.displayName,
            email: event.email,
            id: event.uid,
            photoUrl: event.photoURL ? event.photoURL : ''
          };
        }
      });
    } catch (err) {}
  }

  onCancel() {
    this.loginForm.reset();
    this.router.navigate(['/']);
  }

  goToRegistration() {
    this.router.navigate(['register']);
  }
}
