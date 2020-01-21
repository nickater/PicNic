import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserLoginComponent } from './home/login/user-login/user-login.component';
import { UserRegistrationComponent } from './home/registration/user-registration/user-registration.component';
import { MaterialModule } from './shared/angular-material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirebaseModule } from './shared/angular-fire.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserLoginComponent,
    UserRegistrationComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFirebaseModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {}
