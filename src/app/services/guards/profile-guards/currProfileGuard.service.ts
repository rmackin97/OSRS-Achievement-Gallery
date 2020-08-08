import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// services
import { ProfileService } from '../../profile.service';

@Injectable({
  providedIn: 'root'
})
export class CurrProfileGuardService implements CanActivate {

  constructor(private profileService: ProfileService, private router: Router) { }

  // return true if a current selected profile exists; false otherwise
  canActivate(): Observable<boolean> {
    return this.profileService.currProfile.pipe(map(profile => {
      if(profile) {
        return true;
      } else {
        console.log("curr profile does not exist")
        this.router.navigate(['home']);
        return false;
      }
    }));
  }
}
