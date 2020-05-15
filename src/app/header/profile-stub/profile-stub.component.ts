import { Component, OnInit, ElementRef, HostListener } from '@angular/core';

import { ProfileService } from "../../services/profile.service";

@Component({
  selector: 'app-profile-stub',
  templateUrl: './profile-stub.component.html',
  styleUrls: ['./profile-stub.component.css']
})
export class ProfileStubComponent implements OnInit {
  selectedProfile: string;
  profiles: any[];

  constructor(private profileService: ProfileService, private eRef: ElementRef) { }

  // im thinking get rid of drop down, rename settings to account
  // and under account have the same profiles tab and thats were you switch profiles
  ngOnInit(): void {
    this.getCurrentProfile();
    this.getAllProfiles();
  }

  // create profile
  // delete profile
  // edit profile (username only -- nothing else can change)
  // switch profile
  // display current profile info

  getCurrentProfile(){
    this.profileService.getCurrentProfile((data) => {
      this.selectedProfile = data;
    }, (err) => console.log(err));
  }

  getAllProfiles(){
    this.profileService.getAllProfiles().subscribe(profiles => {
      // removes the selected profile from the list of all profiles
      for(let i = 0; i < profiles.length; i++){
        if(profiles[i] == this.selectedProfile){
          profiles.splice(i, 1);
        }
      }
      this.profiles = profiles;
    });
  }






  toggleDropdown(){
    let dropdown = document.getElementById("profile-dropdown");

    if(dropdown.className == "hidden"){
      dropdown.className = "visible";
    } else {
      dropdown.className = "hidden";
    }
  }

  // @HostListener("document:click", ["$event"])
  // onClick(event){
  //   if(!this.eRef.nativeElement.contains(event.target) &&
  //     document.getElementById("profile-dropdown").className == "visible"){
  //     this.toggleDropdown();
  //   } 
  // }

}