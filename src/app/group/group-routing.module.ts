import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListGroupComponent } from './list-group/list-group.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { UpdateGroupComponent } from './update-group/update-group.component';
import { DeleteGroupComponent } from './delete-group/delete-group.component';
import { GroupExistsComponent } from '../home/registration/group-selector/group-exists/group-exists.component';
import { GroupDoesntExistComponent } from '../home/registration/group-selector/group-doesnt-exist/group-doesnt-exist.component';

const childRoutes: Routes = [
  { path: '', component: ListGroupComponent },
  { path: 'create', component: CreateGroupComponent },
  { path: 'update', component: UpdateGroupComponent },
  { path: 'delete', component: DeleteGroupComponent },
  { path: 'exists', component: GroupExistsComponent },
  { path: 'doesntexist', component: GroupDoesntExistComponent }
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class GroupRoutingModule {}
