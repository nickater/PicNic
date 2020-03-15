import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { GroupDALService } from './shared/services/group-dal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngPicNicV2';
  constructor(public auth: AuthService, public groupService: GroupDALService) {
    if (!this.groupService.groupId) {
      this.groupService.groupId = sessionStorage.getItem('groupId');
    }
  }
}
