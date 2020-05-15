import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

// services
import { ProfileService } from "../../services/profile.service";

@Component({
  selector: 'app-settings-profiles',
  templateUrl: './settings-profiles.component.html',
  styleUrls: ['./settings-profiles.component.css']
})
export class SettingsProfilesComponent implements OnInit {
  contentView: string;
  createProfileForm: FormGroup;
  profiles: any[];
  
  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.createProfileForm = new FormGroup({
      //todo username regex valid characters
      username: new FormControl(null, [Validators.required, Validators.maxLength(12)])
    });

    this.getAllProfiles();


    // something like this VVVVV
    // profileService.count() == 0 ? contentView = "_create" : contentView = profileService.getCurrentProfile()
  }

  renderView(event){
    this.contentView = event.target.id;

    let elements = document.getElementsByClassName("selected-view");
    for(let i = 0; i < elements.length; i++){
      elements[i].classList.remove("selected-view");
    }
    document.getElementById(event.target.id).classList.add("selected-view");
  }

  createProfile(profileData){
    console.log(profileData.username);
    this.profileService.createProfile(profileData.username)
      .subscribe(result => {
        // todo prompt user on failure/success?
        console.log(result);
      });  
  }

  getAllProfiles(){
    this.profileService.getAllProfiles().subscribe(profiles => {
      this.profiles = profiles;
    });
  }

}
