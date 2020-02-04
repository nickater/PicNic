import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserLoginComponent } from './home/login/user-login/user-login.component';
import { UserRegistrationComponent } from './home/registration/user-registration/user-registration.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { InitialFormComponent } from './home/initial-form/initial-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserRegistrationComponent },
  { path: 'initialForm', component: InitialFormComponent },
  { path: 'profile', component: UserProfileComponent },
  {
    path: 'group',
    loadChildren: './group/group.module#GroupModule'
  },
  {
    path: 'events',
    loadChildren: './events/event.module#EventModule'
  },
  {
    path: 'food',
    loadChildren: './food/food.module#FoodModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
