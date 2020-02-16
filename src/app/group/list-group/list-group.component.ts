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

  constructor(public groupService: GroupDALService) {}

  ngOnInit() {
    this.group$ = this.groupService.getGroupById(this.groupService.groupId);
  }
}
