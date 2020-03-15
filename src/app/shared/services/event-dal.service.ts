import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { GroupDALService } from './group-dal.service';
import { Event, PlannedMeal } from 'src/app/models/event';
import { Observable, pipe, merge } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EventDalService {
  pastCollection: AngularFirestoreCollection<Event> = this.afs
    .collection('groups')
    .doc(this.groupService.groupId)
    .collection<Event>('pastEvents', (ref) => ref.orderBy('startDate', 'desc'));

  futureCollection: AngularFirestoreCollection<Event> = this.afs
    .collection('groups')
    .doc(this.groupService.groupId)
    .collection<Event>('upcomingEvents', (ref) =>
      ref.orderBy('startDate', 'asc')
    );

  constructor(
    private afs: AngularFirestore,
    private groupService: GroupDALService
  ) {}

  getUpcomingEvents(): Observable<Event[]> {
    return this.convertEmptyArrayToUndefined(
      this.futureCollection.valueChanges()
    );
  }

  getPastEvents(): Observable<Event[]> {
    return this.convertEmptyArrayToUndefined(
      this.pastCollection.valueChanges()
    );
  }

  convertEmptyArrayToUndefined(
    events: Observable<Event[]>
  ): Observable<Event[] | null> {
    return events.pipe(
      map((res) => {
        let array;
        if (res.length === 0) {
          array = null;
        } else {
          array = res;
        }
        return array;
      })
    );
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
        const startDate = moment(res.startDate.toDate());
        const endDate = moment(res.endDate.toDate());
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

  async addIdToEvent(event: Event): Promise<Event> {
    return new Promise<Event>((resolve) => {
      const id = this.afs.createId();
      const newEvent: Event = {
        ...event,
        id
      };
      resolve(newEvent);
    });
  }

  addFoodToEvent(meals: Array<PlannedMeal>, eventId: string) {
    this.getUpcomingEventById(eventId).subscribe((res) => {
      const event: Event = res;
      event.plannedMeals = meals;
      this.submitEventWithFood(event);
    });
  }

  submitEventWithFood(event: any) {
    return this.afs
      .collection('groups')
      .doc(this.groupService.groupId)
      .collection('upcomingEvents')
      .doc(event.id)
      .set(event)
      .catch((err) => console.error(err));
  }

  createEvent(event: Event) {
    const duration = this.eventDayCount(event);
    const eventWithDuration = this.addDayCountToEvent(event, duration);
    return new Promise<string>((resolve) => {
      this.addIdToEvent(eventWithDuration)
        .then((eventWithId) => {
          this.afs
            .collection('groups')
            .doc(this.groupService.groupId)
            .collection('upcomingEvents')
            .doc(eventWithId.id)
            .set(eventWithId)
            .then(() => {
              resolve(eventWithId.id);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }
}
