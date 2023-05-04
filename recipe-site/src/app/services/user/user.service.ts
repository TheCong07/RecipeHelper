import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get('user');
  }

  getUserFavoriteLists() {
    return this.http.get('api/user/favorite');
  }

  createRecipeList(data: any) {
    return this.http.post('customer/recipeList', data);
  }
}
