import { Component, OnInit, Input } from '@angular/core';
import { Event } from 'src/app/models/event';
import { AngularFirestoreCollection } from '@angular/fire/firestore/collection/collection';
import { EventDalService } from 'src/app/shared/services/event-dal.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss']
})
export class UpcomingEventsComponent implements OnInit {
  @Input() upcomingEvents: Observable<Event[]>;
  noEvents = true;

  constructor() {}

  ngOnInit() {
    if (this.upcomingEvents) {
      this.noEvents = false;
    } else {
      this.noEvents = true;
    }
  }
}
