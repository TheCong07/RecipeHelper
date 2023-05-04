import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe/recipe.service';
import { Recipe } from '../recipe';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {
  recipe: any;
  results: any;
  filter: any;
  id: any;
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.id = paramMap?.get('recipeID');
    });
    this.getRecipe();
  }
  getRecipe() {
    this.recipeService.getRecipe(this.id).subscribe((recipe) => {
      this.recipe = recipe;
    });
  }
}
