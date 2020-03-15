import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../../../models/event';

@Component({
  selector: 'app-past-events',
  templateUrl: './past-events.component.html',
  styleUrls: ['./past-events.component.scss']
})
export class PastEventsComponent implements OnInit {
  @Input() pastEvents: Observable<Event[]>;
  stillLoading = true;
  ngOnInit() {
    setTimeout(() => {
      this.stillLoading = false;
    }, 5000);
  }
}
