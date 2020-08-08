import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// services
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class UnloggedGuardService implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  /**
   * Return true if no user is logged in; false otherwise
   */
  canActivate(): boolean {
    if(!this.userService.hasUser()) {
      return true;
    } else {
      this.router.navigate(['home']);
      return false;
    }


    // return this.userService.currUser.pipe(map(user => {
    //   if(!user) {
    //     // console.log("UnLoggedGuard -- NO user logged in; continue")
    //     return true;
    //   } else {
    //     // console.log("UnloggedGuard -- user logged in; routing home")
    //     this.router.navigate(['home']);
    //     return false;
    //   }
    // }));
  }
}
