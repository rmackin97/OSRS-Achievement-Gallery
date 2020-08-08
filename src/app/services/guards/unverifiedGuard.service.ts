import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// services
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class UnverifiedGuardService implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  /**
   * Return true if a current user is logged in and unverified or if no user is logged in; otherwise false
   */
  canActivate(): boolean {
    if(!this.userService.isVerified()) {
      return true;
    } else {
      this.router.navigate(['home']);
      return false;
    }



    // return this.userService.currUser.pipe(map(user => {
    //   if(user) {
    //     if(user.verified) {
    //       // console.log("UnverifiedGuard -- user logged in & verified; routing home")
    //       this.router.navigate(['home']);
    //       return false;
    //     } else {
    //       // console.log("UnverifiedGuard -- user logged in & NOT verified; continue")
    //       return true;
    //     }
    //   } else {
    //     // console.log("UnverifiedGuard -- NO user logged in; continue")
    //     return true;
    //   }
    // }));
  }

}
