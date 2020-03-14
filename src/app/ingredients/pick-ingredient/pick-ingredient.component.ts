import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pick-ingredient',
  templateUrl: './pick-ingredient.component.html',
  styleUrls: ['./pick-ingredient.component.css']
})
export class PickIngredientComponent implements OnInit {
  @Input() formGroupName: FormGroup;

  constructor() {}

  ngOnInit() {}
}
