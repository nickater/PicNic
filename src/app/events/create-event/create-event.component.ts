import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { EventDalService } from 'src/app/shared/services/event-dal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  createEventForm: FormGroup;

  constructor(
    private eventService: EventDalService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.createEventForm = this.fb.group({
      name: '',
      startDate: null,
      endDate: null,
      notes: ''
    });
  }

  onCancel() {
    this.router.navigate(['events']);
    this.createEventForm.reset();
  }

  onSumbit() {
    this.eventService.createEvent(this.createEventForm.value).then((cred) => {
      this.eventService.eventId = cred.id;
      this.router.navigate(['events/addEventFood', cred.id]);
    });
  }
}
