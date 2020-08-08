import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

// services
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class VerifiedGuardService implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  /**
   * Returns true if a current user is logged in and verified; false otherwise
   */
  canActivate(): boolean {
    if(this.userService.isVerified()) {
      return true;
    } else {
      this.router.navigate(['home']);
      return false;
    }
  }
}
