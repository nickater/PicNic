import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../../../models/event';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss']
})
export class UpcomingEventsComponent implements OnInit {
  @Input() upcomingEvents: Observable<Event[]>;
  stillLoading = true;
  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.stillLoading = false;
    }, 4000);
  }

  navigateToDetails(eventId: string) {
    this.router.navigate(['events/details', eventId]);
  }
}
