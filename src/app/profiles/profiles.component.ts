import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

// services
import { ProfileService } from "../services/profile.service";

// models
import { Profile } from '../models/profile.model';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  currProfile: Profile;
  profileList: Profile[];

  addProfile: boolean;
  isLoading: boolean;

  constructor(
    private profileService: ProfileService, 
    private route: ActivatedRoute,
    private router: Router) { 
      this.router.routeReuseStrategy.shouldReuseRoute = () => { return false; }
  }

  ngOnInit(): void {
    this.isLoading = true; 
    // subscribe to the current url path
    this.route.url.subscribe(url => {
      this.addProfile = url.length === 0 ? false : true;
      
      // subscribe to current profile data
      this.profileService.currProfile.subscribe(profile => {
        this.currProfile = profile;

        // subscribe to current profile list data
        this.profileService.profileList.subscribe(profiles => {
          this.profileList = profiles;

          this.isLoading = false;
        });
      });
    });
  }

  selectProfile(profileId, username = null){
    if(profileId === this.currProfile.id && !this.addProfile) return;

    if(profileId !== -1) {
      // selects specified user profile
      this.profileService.selectProfile(profileId, (result) => {
        this.profileService.getUserProfiles((profiles) => {
          // navigates to the selected profile's page
          this.router.navigate(['/profiles'], { queryParams: { username: this.currProfile.username }});
        }, (err) => {
          console.log(err); // todo handle error
        });
      }, (err) => {
        console.log(err); //todo handle error
      });
    } else {
      // navigates to the add profile page
      this.router.navigate(['/profiles/add']);
    }
  }
  
}