import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user$: Observable<User>;
  title = 'AngPicNicV2';

  constructor() {
    
  }
}
