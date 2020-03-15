import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { MaterialModule } from '../shared/angular-material';

@NgModule({
  declarations: [
    UserProfileComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    CreateUserComponent
  ],
  imports: [CommonModule, MaterialModule]
})
export class UserModule {}
