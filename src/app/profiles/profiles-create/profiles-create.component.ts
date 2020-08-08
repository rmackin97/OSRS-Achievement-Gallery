import { Component, OnInit } from '@angular/core';
import { FormBuilderService } from 'src/app/services/form-builder.service';
import { FormGroup, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';

// services
import { ProfileService } from 'src/app/services/profile.service';
import { ErrorService } from 'src/app/services/error.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-profiles-create',
  templateUrl: './profiles-create.component.html',
  styleUrls: ['./profiles-create.component.css']
})
export class ProfilesCreateComponent implements OnInit {

  gamemodes: string[] = ['Main', 'Ironman', 'Hardcore Ironman', 'Ultimate Ironman'];

  registerProfileForm: FormGroup;

  isLoading: boolean;

  processing: boolean;

  constructor(
    private formBuilderService: FormBuilderService, 
    private profileService: ProfileService,
    private errorService: ErrorService,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.formBuilderService.registerProfileForm(form => {
      this.registerProfileForm = form;
      this.isLoading = false;
    });
  }
  
  createProfile(profileData){
    this.processing = true;
    // creates a new profile with the user provided username and gamemode
    this.profileService.createProfile(profileData.username, profileData.gamemode, (OSRSApiStatus) => {
      this.profileService.getUserProfiles(profiles => {
        this.processing = false;
        this.profileService.currProfile.pipe(take(1)).subscribe(profile => {
          // routes the user to the new profile's page
          this.router.navigate(['/profiles'], { queryParams: { username: profile.username }});
        })
        if(!OSRSApiStatus) {
          // announces if the profile was created without the OSRS API data
          this.errorService.openErrorSnackbar('The OSRS API appears to be down. Please try to update ....') //todo
        }
      }, err => {
        console.log(err); // todo handle error
      });
    }, (err) => {
      this.processing = false;
      if(err.status === 406) {
        // 406 - profile already exists
        this.errorService.openErrorSnackbar('Profile \"'+ profileData.username +'\" already exists!');
      } else if(err.status === 409) {
        // 409 - invalid profile
        this.errorService.openErrorSnackbar('Invalid profile! Please update your username and/or gamemode.') 
        // todo ^^^^^ wrong prompt
      } 
      console.log(err); //todo handle error (500... anything else?)
    });
  }
  
  getErrorMessage(formControl: AbstractControl) {
    if(formControl.hasError('required')) {
      return 'Required'
    } else if(formControl.hasError('maxlength')) {
      return 'Invalid username'
    } else if(formControl.hasError('pattern')) {
      return 'Invalid username'
    }    
  }

}
