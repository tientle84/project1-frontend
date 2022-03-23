import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const role = this.userService.getUser().roleId;
    const expectedRole = route.data['expectedRole'];

    if (this.userService.isLoggedIn()) {
      if (role !== expectedRole) {
        this.router.navigate(['/forbidden']);
        return false;
      } else {
        return true;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
