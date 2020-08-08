import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

// service
import { ProfileService } from '../../services/profile.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

// model
import { Profile } from '../../models/profile.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  toggle: boolean = false;
  layout: string;

  currProfile: Profile;

  verified: boolean;
  isLoading: boolean;

  constructor(
    private profileService: ProfileService, 
    private userService: UserService, 
    private router: Router,
    private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.isLoading = true; 
    // subscribe to the current user data (to detect login/logout)
    this.userService.currUser.subscribe(user => {
      // checks if a user is logged in and verified
      this.verified = this.userService.isVerified();

      // subscribe to current profile data
      this.profileService.currProfile.subscribe(profile => {
        this.currProfile = profile;

        // subscribe to media breakpoint 
        this.breakpointObserver.observe(['(max-width: 768px)']).subscribe((state: BreakpointState) => {
          this.layout = state.matches ? 'small' : 'large';

          this.isLoading = false;
        });
      });
    });
  }

  userLogout() {
    // logs the current user out
    this.userService.userLogout((result) => {
      // routes to the home page after user logout
      this.router.navigateByUrl('home');
    }, (err) => {
      console.log(err); // todo handle err (500 possible?)
    });
  }

  profileNav() {
    if(this.currProfile) {
      // navigates to the selected profile's page
      this.router.navigate(['/profiles'], { queryParams: { username: this.currProfile.username }});
    } else {
      // navigates to the add profile page
      this.router.navigate(['/profiles/add']);
    }
  }

  accountNav() {
    // navigates to the account settings page
    this.router.navigate(['/account']);
  }

  // sidebar toggles
  toggleSidebar(){
    this.toggle = !this.toggle;
  }

  closeSidebar(){
    this.toggle = false;
  }

}