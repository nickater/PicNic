import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngredientDalService } from 'src/app/shared/services/ingredient-dal.service';
import { IngredientChoice } from 'src/app/models/ingredient';

@Component({
  selector: 'app-create-ingredients',
  templateUrl: './create-ingredients.component.html',
  styleUrls: ['./create-ingredients.component.scss']
})
export class CreateIngredientsComponent implements OnInit {
  addIngredientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ingredientService: IngredientDalService
  ) {}

  ngOnInit() {
    this.addIngredientForm = this.fb.group({
      name: ['', Validators.required],
      isLiquid: [null, Validators.required],
      lastMealUsedFor: null,
      popularity: 0
    });
  }

  onSubmit() {
    this.ingredientService.addPrivateIngredient(this.addIngredientForm.value);
    this.addIngredientForm.reset({
      name: '',
      isLiquid: null,
      lastMealUsedFor: null,
      popularity: 0
    });
  }

  onReset() {
    this.addIngredientForm.reset({
      name: '',
      isLiquid: null,
      lastMealUsedFor: null,
      popularity: 0
    });
  }
}
