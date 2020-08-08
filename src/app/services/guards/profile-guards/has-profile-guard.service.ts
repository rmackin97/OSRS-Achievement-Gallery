import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// services
import { ProfileService } from '../../profile.service';

@Injectable({
  providedIn: 'root'
})
export class HasProfilesGuardService implements CanActivate {

  constructor(private profileService: ProfileService, private router: Router) { }

  // return true if this user has one or more profiles; false otherwise
  canActivate(): Observable<boolean> {
    return this.profileService.profileList.pipe(map(profiles => {
      if(profiles.length > 0) {
        return true;
      } else {
        this.router.navigate(['/home']);
        return false;
      }
    }));
  }
}
