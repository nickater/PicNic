import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventDalService } from 'src/app/shared/services/event-dal.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Event, PlannedMeal } from 'src/app/models/event';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class EventDetailsComponent implements OnInit {
  eventId: string;
  event$: Observable<Event>;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventDalService
  ) {}

  ngOnInit() {
    const event = this.route.params.pipe(
      switchMap((params) => this.eventService.getUpcomingEventById(params.id))
    );
    this.event$ = event;
  }
}
