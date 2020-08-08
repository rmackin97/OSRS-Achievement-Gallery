import { Injectable } from '@angular/core';

// services
import { UserService } from '../services/user.service';
import { ProfileService } from '../services/profile.service'; 

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(private userService: UserService, private profileService: ProfileService) { }

  /**
   * Application initialization function. 
   * 
   * Checks if a user is logged in. If so, gets that user and all user profiles.
   */
  init() {
    return new Promise<void>((resolve, reject) => {
      console.log("Initializing app...");
      // gets the current logged in user
      this.userService.getCurrentUser(user => {
        console.log("Current user", user)

        // gets the current logged in user's profiles
        this.profileService.getUserProfiles((profiles) => {
          console.log("Current user profiles", profiles);

          console.log("App initialization finished")
          resolve();
        }, (err) => {
          if(err.status === 401) {
            this.userService.userLogout((result) => {
              console.log("App initialization finished")
              resolve();
            }, (err) => {
              console.log("App initialization finished")
              resolve();
            });
          } else {
            console.log(err); // todo handle error
            console.log("App initialization finished")
            resolve();
          }
        });
      }, err => {
        console.log(err); // todo handle error (401 and 500 possible)
        console.log("App initialization finished")
        resolve();
      });
    });
  }

}
