import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// services
import { ProfileService } from '../../profile.service';

@Injectable({
  providedIn: 'root'
})
export class ValidProfileGuardService implements CanActivate {

  constructor(
    private profileService: ProfileService, 
    private router: Router) { }

  /**
   * Returns true if the specified profile is the selected profile; otherwise false
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const username = route.queryParamMap.get('username');
    return this.profileService.currProfile.pipe(map(profile => {
      if(profile.username === username) {
        return true;
      } else {
        this.router.navigate(['/home'])
        return false;
      }
    }));
  }
}