import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IngredientChoice, Ingredient } from 'src/app/models/ingredient';
import { Observable, ReplaySubject } from 'rxjs';
import { IngredientDalService } from '../../services/ingredient-dal.service';
import { startWith, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-ingredient-choice',
  templateUrl: './ingredient-choice.component.html',
  styleUrls: ['./ingredient-choice.component.scss'],
})
export class IngredientChoiceComponent implements OnInit {
  @Input() ingredientFormGroup: FormGroup;
  @Input() unfilteredIngredients: ReplaySubject<IngredientChoice[]>;

  filteredOptions: Observable<IngredientChoice[]>;

  ngOnInit() {
    this.unfilteredIngredients.subscribe((res) => {
      this.filteredOptions = this.ingredientFormGroup.valueChanges.pipe(
        startWith(''),
        map((value) => (typeof value === 'string' ? value : value.name)),
        map((name) => {
          if (name instanceof Object) {
            return name ? _filter(name.name) : res.slice();
          } else {
            return name ? _filter(name) : res.slice();
          }
        })
      );

      function _filter(name: string): IngredientChoice[] {
        const filterValue = name.toLowerCase();

        return res.filter((option) =>
          option.name.toLowerCase().includes(filterValue)
        );
      }
    });
  }

  displayFn(ingredient: IngredientChoice): string {
    return ingredient && ingredient.name ? ingredient.name : '';
  }

  deleteIngredient() {}
}
