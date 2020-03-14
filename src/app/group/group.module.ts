import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListGroupComponent } from './list-group/list-group.component';
import { UpdateGroupComponent } from './update-group/update-group.component';
import { DeleteGroupComponent } from './delete-group/delete-group.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { GroupRoutingModule } from './group-routing.module';
import { MaterialModule } from '../shared/angular-material';
import { GroupExistsComponent } from '../home/registration/group-selector/group-exists/group-exists.component';
import { GroupDoesntExistComponent } from '../home/registration/group-selector/group-doesnt-exist/group-doesnt-exist.component';
import { SharedComponentsModule } from '../shared/shared-components.module';

@NgModule({
  declarations: [
    ListGroupComponent,
    UpdateGroupComponent,
    DeleteGroupComponent,
    CreateGroupComponent,
    GroupExistsComponent,
    GroupDoesntExistComponent
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    MaterialModule,
    SharedComponentsModule
  ]
})
export class GroupModule {}
