import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
})
export class FavoriteComponent implements OnInit {
  title = 'HomeComponent';
  results: any;
  userDisplayName: string | undefined;

  recipeListForm = this.formBuilder.group({
    listName: '',
    description: '',
  });

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    let userID = sessionStorage.getItem('userID');
    if (userID) {
      this.userService
        .getUserFavoriteLists()
        .subscribe((expressServiceResult: any) => {
          this.results =
            expressServiceResult.length > 0 ? expressServiceResult : null;
        });
    }
  }

  createRecipeList() {
    let userID = sessionStorage.getItem('userID');
    if (userID) {
      this.userService
        .createRecipeList(this.recipeListForm.value)
        .subscribe((result: any) => {
          if (result) {
            location.reload();
          }
        });
    }
    this.recipeListForm.reset();
  }
}
