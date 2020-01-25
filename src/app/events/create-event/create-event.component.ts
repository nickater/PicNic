import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EventDalService } from 'src/app/shared/services/event-dal.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  addEventForm: FormGroup;

  constructor(private eventService: EventDalService, private fb: FormBuilder) {}

  ngOnInit() {
    this.addEventForm = this.fb.group({});
  }

  onSumbit() {
    this.eventService.createEvent(this.addEventForm.value);
  }
}
