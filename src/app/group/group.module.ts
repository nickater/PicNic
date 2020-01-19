import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListGroupComponent } from './list-group/list-group.component';
import { UpdateGroupComponent } from './update-group/update-group.component';
import { DeleteGroupComponent } from './delete-group/delete-group.component';
import { CreateGroupComponent } from './create-group/create-group.component';

@NgModule({
  declarations: [
    ListGroupComponent,
    UpdateGroupComponent,
    DeleteGroupComponent,
    CreateGroupComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class GroupModule { }
