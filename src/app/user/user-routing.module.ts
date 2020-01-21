import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';

const childRoutes: Routes = [
  { path: '', component: UserProfileComponent },
  { path: 'update', component: UpdateUserComponent },
  { path: 'create', component: CreateUserComponent },
  { path: 'delete', component: DeleteUserComponent }
];
@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
