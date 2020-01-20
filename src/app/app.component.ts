import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';
import { GroupDALService } from './shared/services/group-dal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngPicNicV2';
  groupId$: Observable<string>;
  constructor(
    public auth: AuthService,
    private router: Router,
    public groupService: GroupDALService
  ) {}
}
