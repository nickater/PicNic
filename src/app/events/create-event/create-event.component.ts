import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { EventDalService } from "src/app/shared/services/event-dal.service";

@Component({
  selector: "app-create-event",
  templateUrl: "./create-event.component.html",
  styleUrls: ["./create-event.component.scss"]
})
export class CreateEventComponent implements OnInit {
  createEventForm: FormGroup;

  constructor(private eventService: EventDalService, private fb: FormBuilder) {}

  ngOnInit() {
    this.createEventForm = this.fb.group({
      name: "",
      startDate: null,
      endDate: null,
      plannedMeals: this.fb.array([
        {
          dayNumber: 0,
          meals: this.fb.array([
            {
              mealTime: "",
              food: this.fb.array([])
            }
          ])
        }
      ]),
      attendees: this.fb.array([])
    });
  }

  onSumbit() {
    this.eventService.createEvent(this.createEventForm.value);
  }
}
