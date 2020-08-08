import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// services
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuardService implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  /**
   * Returns true if a user is logged in; false otherwise
   */
  canActivate(): boolean {
    if(this.userService.hasUser()) {
      return true;
    } else {
      this.router.navigate(['home']);
      return false;
    }
  }
}
