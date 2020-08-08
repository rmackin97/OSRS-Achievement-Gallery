import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';

// models
import { Profile } from '../models/profile.model';

// services
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private currProfileSource: BehaviorSubject<Profile> = new BehaviorSubject<Profile>(null);
  currProfile = this.currProfileSource.asObservable();

  private profileListSource: BehaviorSubject<Profile[]> = new BehaviorSubject<Profile[]>([]);
  profileList = this.profileListSource.asObservable();

  constructor(private http: HttpClient, private userService: UserService) {
    // subscribes to the current user
    this.userService.currUser.subscribe(user => {
      // if the current user is null then there should be no associated profiles
      if(!user) {
        this.currProfileSource.next(null);
        this.profileListSource.next([]);
      }
    });
  }

  /**
   * Gets a list of all profiles for the calling user, or an empty list if none exist.
   */
  getUserProfiles(done, callback) {
    this.http.get("/user/profiles").subscribe((profiles: any[]) => {
      if(profiles.length === 0) {
        this.currProfileSource.next(null);
        this.profileListSource.next([]);
        return done(profiles);
      } else {
        let profileList = [];
        for(const profile of profiles) {
          let p = new Profile(profile);
          profileList.push(p);
          if(p.selected) this.currProfileSource.next(p);
        }
        this.profileListSource.next(profileList);
        return done(profiles);
      }
    }, (err) => {
      callback(err);
    });
  }

  /**
   * "Selects" the specified profile for the calling user.
   * @param profileId the id of the specified profile
   */
  selectProfile(profileId, done, callback) {
    this.http.get("/user/profile/"+ profileId +"/select").subscribe((result) => {
      done(result);
    }, (err) => {
      callback(err);
    });
  }

  /**
   * Creates a new profile for the calling user.
   * 
   * Returns a boolean indicating OSRS API status. True if OSRS API was available; otherwise false.
   * 
   * Error 406 returned if this profile already exists for the calling user. Error 409 is returned
   * if the provided profile information is invalid. 
   * 
   * Note: due to OSRS API timeout (15 seconds) an invalid profile is possible.
   * @param username the new profile's username
   * @param gamemode the new profile's gamemode
   */
  createProfile(username, gamemode, done, callback) {
    this.http.post("/user/profile/create", { 
      "username": username,
      "gamemode": gamemode
    }).subscribe((OSRSApiStatus) => {
      done(OSRSApiStatus);
    }, (err) => {
      callback(err);
    });
  }

/**
 * Deletes the specified profile for the calling user.
 * @param profileId the id of the specified profile
 */
  deleteProfile(profileId, done, callback) {
    this.http.post('/user/profile/'+ profileId +'/delete', null).subscribe(result => {
      done(result);
    }, err => {
      callback(err);
    });
  }


/**
 * Updates the specified profile for the calling user.
 * 
 * Error 409 is returned if the provided profile information is invalid. Error 503 is returned if
 * the OSRS API is down.
 * @param profileId the id of the specified profile
 */
  updateProfile(profileId, done, callback) {
    this.http.post('/user/profile/'+ profileId +'/update', null).subscribe(result => {
      done(result);
    }, err => {
      callback(err);
    });
  }

  /**
   * Edits the specified profile for the calling user. 
   * 
   * Error 406 returned if the provided profile username already exists for the calling user.
   * 
   * Note: the OSRS API is not checked; so an invalid profile is possible.
   * @param profileId the id of the specified profile
   */
  editProfile(profileId, profileData, done, callback) {
    this.http.post('/user/profile/'+ profileId +'/edit', profileData).subscribe(result => {
      done(result);
    }, err => {
      callback(err);
    });
  }

  /**
   * Returns all of specified profile's filters for the calling user.
   */
  getProfileFilters(profileId, done, callback) {
    this.http.get('/user/profile/'+ profileId +'/filters').subscribe(filters => {
      done(filters);
    }, err => {
      callback(err);
    });
  }

  /**
   * Updates the specified filter for the specified profile for the calling user.
   */
  setProfileFilter(profileId, filterId, done, callback) {
    this.http.post('/user/profile/'+ profileId +'/filters/'+ filterId, null).subscribe(result => {
      done(result);
    }, err => {
      callback(err);
    })
  }

}