import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { UserLoginComponent } from "./home/login/user-login/user-login.component";
import { UserRegistrationComponent } from "./home/registration/user-registration/user-registration.component";
import { GroupModule } from "./group/group.module";
import { UserModule } from "./user/user.module";
import { FoodModule } from "./food/food.module";
import { MeasurementModule } from "./food/measurement/measurement.module";
import { MaterialModule } from "./shared/angular-material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFirebaseModule } from "./shared/angular-fire.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GroupModule,
    UserLoginComponent,
    UserRegistrationComponent,
    UserModule,
    FoodModule,
    MeasurementModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFirebaseModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {}
