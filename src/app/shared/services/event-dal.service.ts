import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { GroupDALService } from './group-dal.service';
import { Event } from 'src/app/models/event';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EventDalService {
  eventId = 'TdgZSxk90nKwKQxceX5N';

  constructor(
    private afs: AngularFirestore,
    private groupService: GroupDALService
  ) {
    debugger;
  }

  getUpcomingEvents(): Observable<Event[]> {
    let itemsCollection: AngularFirestoreCollection<Event>;
    let items: Observable<Event[]>;
    itemsCollection = this.afs
      .collection('groups')
      .doc(this.groupService.groupId)
      .collection('upcomingEvents');
    items = itemsCollection.valueChanges();
    return items;
  }

  getUpcomingEventById(eventId: string): Observable<Event> {
    return this.afs
      .collection('groups')
      .doc(this.groupService.groupId)
      .collection('upcomingEvents')
      .doc<Event>(eventId)
      .valueChanges();
  }

  async eventDaysCount(eventId: string) {
    return new Promise<number>((resolve) => {
      let diff;
      this.getUpcomingEventById(eventId).subscribe((res: any) => {
        let startDate = moment(res.startDate.toDate());
        let endDate = moment(res.endDate.toDate());
        diff = endDate.diff(startDate, 'days');
        resolve(diff);
      });
    });
  }

  eventDayCount(event: Event) {
    const startDate = moment(event.startDate);
    const endDate = moment(event.endDate);
    const diff = endDate.diff(startDate, 'days');
    return diff;
  }

  addDayCountToEvent(event: Event, duration: number) {
    event.duration = duration;
    return event;
  }

  getPastEvents(): AngularFirestoreCollection<Event> {
    return this.afs
      .collection('groups')
      .doc(this.groupService.groupId)
      .collection('pastEvents');
  }

  createEvent(event: Event) {
    let duration = this.eventDayCount(event);
    let eventWithDuration = this.addDayCountToEvent(event, duration);
    return this.afs
      .collection('groups')
      .doc(this.groupService.groupId)
      .collection('upcomingEvents')
      .add(eventWithDuration);
  }
}
