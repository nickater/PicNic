import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../../../models/event';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss']
})
export class UpcomingEventsComponent implements OnInit {
  @Input() upcomingEvents: Observable<Event[]>;

  constructor() {}

  ngOnInit() {}
}
