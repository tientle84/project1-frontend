import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  public isLoggedIn() {
    return this.userService.isLoggedIn();
  }

  public logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  public getUserName() {
    const fistName = this.userService.getUser().firstName;
    const lastName = this.userService.getUser().lastName;
    return fistName + ' ' + lastName;
  }
}
