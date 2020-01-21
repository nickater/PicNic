import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEventsComponent } from './list-events/list-events.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { UpdateEventComponent } from './update-event/update-event.component';
import { DeleteEventComponent } from './delete-event/delete-event.component';

const childRoutes: Routes = [
  { path: '', component: ListEventsComponent },
  { path: 'create', component: CreateEventComponent },
  { path: 'update/:id', component: UpdateEventComponent },
  { path: 'delete', component: DeleteEventComponent }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class EventRoutingModule {}
