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
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { environment } from 'src/environments/environment';
import { InitialFormComponent } from './home/initial-form/initial-form.component';
import { ErrorPromptComponent } from './home/login/error-prompt/error-prompt.component';
import { AreYouSureComponent } from './shared/components/are-you-sure/are-you-sure.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserLoginComponent,
    UserRegistrationComponent,
    UserProfileComponent,
    InitialFormComponent,
    ErrorPromptComponent,
    AreYouSureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFirebaseModule,
    ReactiveFormsModule,
    NgxAuthFirebaseUIModule.forRoot(
      environment.firebaseConfig,
      () => 'your_app_name_factory',
      {
        enableFirestoreSync: false, // enable/disable autosync users with firestore
        toastMessageOnAuthSuccess: false, // whether to open/show a snackbar message on auth success - default : true
        toastMessageOnAuthError: false, // whether to open/show a snackbar message on auth error - default : true
        authGuardFallbackURL: '/login', // url for unauthenticated users - to use in combination with canActivate feature on a route
        authGuardLoggedInURL: '/groups', // url for authenticated users - to use in combination with canActivate feature on a route
        passwordMaxLength: 60, // `min/max` input parameters in components should be within this range.
        passwordMinLength: 8, // Password length min/max in forms independently of each componenet min/max.
        // Same as password but for the name
        nameMaxLength: 50,
        nameMinLength: 2,
        // If set, sign-in/up form is not available until email has been verified.
        // Plus protected routes are still protected even though user is connected.
        guardProtectedRoutesUntilEmailIsVerified: true,
        enableEmailVerification: true // default: true
      }
    )
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorPromptComponent, AreYouSureComponent]
})
export class AppModule {}
