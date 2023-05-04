import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe/recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  title = 'HomeComponent';
  results: any;
  id: any;
  userDisplayName: string | undefined;
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.userDisplayName =
      sessionStorage.getItem('userDisplayName') ?? undefined;
    this.route.paramMap.subscribe((paramMap) => {
      this.id = paramMap?.get('id');
    });
    this.recipeService
      .getARecipeList(this.id)
      .subscribe((expressServiceResult) => {
        this.results = expressServiceResult;
      });
  }
}
