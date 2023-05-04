import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  getRecipeList() {
    return this.http.get('recipeList/');
  }

  getARecipeList(id: string) {
    return this.http.get('recipeList/' + id);
  }

  getRecipe(id: string) {
    return this.http.get('recipe/' + id);
  }
}
