import { Component, OnInit } from '@angular/core';
import { EventDalService } from 'src/app/shared/services/event-dal.service';
import { FormBuilder, FormGroup, FormArray, Form } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FoodDALService } from 'src/app/shared/services/food-dal.service';
import { Food } from 'src/app/models/food';
import { Event } from 'src/app/models/event';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-add-food-to-event',
  templateUrl: './add-food-to-event.component.html',
  styleUrls: ['./add-food-to-event.component.scss'],
})
export class AddFoodToEventComponent implements OnInit {
  days: Array<number>;
  event: Event;
  addFoodToEventForm: FormGroup;
  meals = ['breakfast', 'lunch', 'dinner'];
  food$: Observable<Food[]>;
  eventId: string;
  event$: Observable<Event>;

  constructor(
    private eventService: EventDalService,
    private foodService: FoodDALService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => (this.eventId = params.id));
    this.event$ = this.eventService.getUpcomingEventById(this.eventId);
    this.food$ = this.foodService.getAllFood();
    this.addFoodToEventForm = this.fb.group({
      days: this.fb.array([]),
    });
    this.addAllDayGroups();
  }

  addAllDayGroups() {
    this.event$.subscribe((res) => {
      for (let i = 0; i < res.duration; i++) {
        this.mealArray.push(this.addDayGroup(i));
      }
    });
  }

  get mealArray(): FormArray {
    return this.addFoodToEventForm.get('days') as FormArray;
  }

  addDayGroup(index): FormGroup {
    return this.fb.group({
      dayNumber: index,
      breakfast: '',
      lunch: '',
      dinner: '',
    });
  }

  onSubmit() {
    console.log(this.addFoodToEventForm);
    this.eventService.addFoodToEvent(
      this.addFoodToEventForm.value.days,
      this.eventId
    );
    this.router.navigate(['events']).then(() => {
      this.addFoodToEventForm.reset();
    });
  }

  onCancel() {
    this.router.navigate(['events']).then(() => {
      this.addFoodToEventForm.reset();
    });
  }

  // get foodForm(): FormArray {
  //   return this.addFoodToEventForm.get('food') as FormArray;
  // }
}
