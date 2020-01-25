import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEventComponent } from './create-event/create-event.component';
import { ListEventsComponent } from './list-events/list-events.component';
import { UpdateEventComponent } from './update-event/update-event.component';
import { DeleteEventComponent } from './delete-event/delete-event.component';
import { EventRoutingModule } from './event-routing.module';
import { UpcomingEventsComponent } from './list-events/upcoming-events/upcoming-events.component';
import { PastEventsComponent } from './list-events/past-events/past-events.component';
import { MaterialModule } from '../shared/angular-material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateEventComponent,
    ListEventsComponent,
    UpdateEventComponent,
    DeleteEventComponent,
    UpcomingEventsComponent,
    PastEventsComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class EventModule {}
