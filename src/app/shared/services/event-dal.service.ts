import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { GroupDALService } from './group-dal.service';
import { Event } from 'src/app/models/event';

@Injectable({
  providedIn: 'root'
})
export class EventDalService {
  constructor(
    private afs: AngularFirestore,
    private groupService: GroupDALService
  ) {}

  getUpcomingEvents(): AngularFirestoreCollection<Event> {
    return this.afs
      .collection('groups')
      .doc(this.groupService.groupId)
      .collection('upcomingEvents');
  }

  getPastEvents(): AngularFirestoreCollection<Event> {
    return this.afs
      .collection('groups')
      .doc(this.groupService.groupId)
      .collection('pastEvents');
  }

  createEvent(event: Event) {
    this.afs
      .collection('groups')
      .doc(this.groupService.groupId)
      .collection('upcomingEvents')
      .add(event);
  }
}
