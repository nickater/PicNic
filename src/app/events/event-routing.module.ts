import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEventsComponent } from './list-events/list-events.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { UpdateEventComponent } from './update-event/update-event.component';
import { DeleteEventComponent } from './delete-event/delete-event.component';
import { AddFoodToEventComponent } from './add-food-to-event/add-food-to-event.component';
import { DeleteFoodFromEventComponent } from './delete-food-from-event/delete-food-from-event.component';
import { EventDetailsComponent } from './event-details/event-details.component';

const childRoutes: Routes = [
  { path: '', component: ListEventsComponent },
  { path: 'create', component: CreateEventComponent },
  { path: 'update/:id', component: UpdateEventComponent },
  { path: 'delete', component: DeleteEventComponent },
  { path: 'addEventFood/:id', component: AddFoodToEventComponent },
  { path: 'deleteEventFood', component: DeleteFoodFromEventComponent },
  { path: 'details/:id', component: EventDetailsComponent }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class EventRoutingModule {}
