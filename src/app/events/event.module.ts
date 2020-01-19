import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEventComponent } from './create-event/create-event.component';
import { ListEventsComponent } from './list-events/list-events.component';
import { UpdateEventComponent } from './update-event/update-event.component';
import { DeleteEventComponent } from './delete-event/delete-event.component';
import { Routes, RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CreateEventComponent,
    ListEventsComponent,
    UpdateEventComponent,
    DeleteEventComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EventModule { }
