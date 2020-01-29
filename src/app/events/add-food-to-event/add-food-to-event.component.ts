import { Component, OnInit, Input } from '@angular/core';
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
  styleUrls: ['./add-food-to-event.component.scss']
})
export class AddFoodToEventComponent implements OnInit {
  days: Array<number>;
  event: Event;
  addFoodToEventForm: FormGroup;
  meals = ['breakfast', 'lunch', 'dinner'];
  food$: Observable<Food>;
  eventId: string;
  event$: Observable<Event>;
  loading: Observable<boolean> = of(false);

  constructor(
    private eventService: EventDalService,
    private foodService: FoodDALService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    try {
      this.addFoodToEventForm = this.fb.group({
        name: '',
        food: this.fb.array([])
      });

      this.route.params.subscribe((params) => (this.eventId = params.id));
      this.event$ = this.eventService.getUpcomingEventById(this.eventId);
      this.food$ = this.foodService.getAllFood();
      this.event$.subscribe((res) => {
        this.days = new Array(res.duration);
        this.addFoodToEventForm.patchValue({
          food: this.fb.array([this.addAllDayGroups(res.duration)])
        });
      });
    } catch (error) {}
  }

  addAllDayGroups(duration: number): FormGroup {
    for (let i = 0; i < duration; i++) {
      return this.addDayGroup();
    }
  }

  addDayGroup(): FormGroup {
    return this.fb.group({
      breakfast: '',
      lunch: '',
      dinner: ''
    });
  }

  // get foodForm(): FormArray {
  //   return this.addFoodToEventForm.get('food') as FormArray;
  // }
}
