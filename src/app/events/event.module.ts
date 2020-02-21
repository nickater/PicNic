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
import { AddFoodToEventComponent } from './add-food-to-event/add-food-to-event.component';
import { DeleteFoodFromEventComponent } from './delete-food-from-event/delete-food-from-event.component';
import { MomentModule } from 'ngx-moment';
import { EventDetailsComponent } from './event-details/event-details.component';
@NgModule({
  declarations: [
    CreateEventComponent,
    ListEventsComponent,
    UpdateEventComponent,
    DeleteEventComponent,
    UpcomingEventsComponent,
    PastEventsComponent,
    AddFoodToEventComponent,
    DeleteFoodFromEventComponent,
    EventDetailsComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MomentModule
  ]
})
export class EventModule {}
