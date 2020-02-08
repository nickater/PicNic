import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { EventDalService } from 'src/app/shared/services/event-dal.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.scss']
})
export class ListEventsComponent implements OnInit {
  upcomingEvents: Observable<Event[]>;
  pastEvents: Observable<Event[]>;

  constructor(private eventDal: EventDalService) {}

  ngOnInit() {
    this.upcomingEvents = this.eventDal.getUpcomingEvents();
    this.pastEvents = this.eventDal.getPastEvents();
  }
}
