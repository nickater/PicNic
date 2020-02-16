import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserDalService } from 'src/app/shared/services/user-services/user-dal.service';
import { Router } from '@angular/router';
import { AuthProvider } from 'ngx-auth-firebaseui';
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent {
  providers = AuthProvider;
  constructor(private router: Router, private userService: UserDalService) {}

  onSubmit(event) {
    this.userService.mapToUser(event);
    this.router.navigate(['initialForm']);
  }

  displayError(event) {}

  goToLogin() {
    this.router.navigate(['login']);
  }
}
