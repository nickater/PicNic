import { Component, OnInit } from '@angular/core';
import { GroupDALService } from 'src/app/shared/services/group-dal.service';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.scss']
})
export class ListGroupComponent implements OnInit {
  panelOpenState = false;
  group$: Observable<UserModel[]>;
  stillLoading = true;
  statement = 'No one found!';
  constructor(public groupService: GroupDALService) {}

  ngOnInit() {
    setTimeout(() => {
      this.stillLoading = false;
    }, 4000);
    this.group$ = this.groupService.getGroupById(this.groupService.groupId);
  }
}
