import { Component, OnInit, Input } from '@angular/core';
import { Event } from 'src/app/models/event';
import { AngularFirestoreCollection } from '@angular/fire/firestore/collection/collection';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss']
})
export class UpcomingEventsComponent implements OnInit {
  @Input() events: AngularFirestoreCollection<Event>;

  constructor() {}

  ngOnInit() {}
}
