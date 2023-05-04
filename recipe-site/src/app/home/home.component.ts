import { RecipeService } from './../services/recipe/recipe.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'HomeComponent';
  results: any;
  filter: any;
  constructor(private recipeService: RecipeService) {}
  ngOnInit() {
    this.recipeService.getRecipeList().subscribe((expressServiceResult) => {
      this.results = expressServiceResult;
      this.filter = expressServiceResult;
    });
  }

  public findRecipe(event: any) {
    if (event.target.value === '') {
      this.filter = this.results;
    } else {
      this.filter = this.results.filter((result: any) => {
        return result.listName
          .toUpperCase()
          .includes(event.target.value.toUpperCase());
      });
    }
  }
}
