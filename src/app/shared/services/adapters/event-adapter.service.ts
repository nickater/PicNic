import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventAdapterService {
  constructor() {}

  unmappedToEventObject(unMappedEvent: any): Event {
    return;
  }
}
