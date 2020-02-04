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
import { AuthProvider } from 'ngx-auth-firebaseui';
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent {
  providers = AuthProvider;
  constructor(private router: Router, private userService: UserDalService) {}

  routeToInitialForm(event) {
    console.log('event', event);
    this.userService.user = event;
    this.router.navigate(['initialForm']);
  }

  displayError(event) {}

  goToLogin() {
    this.router.navigate(['login']);
  }
}
