import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Hello word';
  userDisplayName: string | undefined;
  constructor(private userService: UserService) {
    this.userDisplayName =
      sessionStorage.getItem('userDisplayName') ?? undefined;
  }
  ngOnInit(): void {
    this.userService.getUser().subscribe((result: any) => {
      if (result.state != 404) {
        sessionStorage.setItem('userID', result.id);
        sessionStorage.setItem('userDisplayName', result.displayName);
        this.userDisplayName =
          sessionStorage.getItem('userDisplayName') ?? undefined;
      } else {
        this.userDisplayName = undefined;
      }
    });
  }
  ngOnDestroy(): void {
    this.userDisplayName = undefined;
  }

  logout(): void {
    this.userDisplayName = undefined;
    sessionStorage.removeItem('userID');
    sessionStorage.removeItem('userDisplayName');
  }
}
