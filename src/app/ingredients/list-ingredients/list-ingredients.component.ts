import { Component, OnInit } from '@angular/core';
import { IngredientDalService } from 'src/app/shared/services/ingredient-dal.service';
import { Observable } from 'rxjs';
import { IngredientChoice } from 'src/app/models/ingredient';

@Component({
  selector: 'app-list-ingredients',
  templateUrl: './list-ingredients.component.html',
  styleUrls: ['./list-ingredients.component.scss']
})
export class ListIngredientsComponent implements OnInit {
  ingredients$: Observable<IngredientChoice[]>;
  stillLoading = true;

  constructor(private ingredientService: IngredientDalService) {}

  ngOnInit() {
    this.ingredients$ = this.ingredientService.getPrivateIngredients();
    this.stillLoading = false;
  }
}
