import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

// dialog
import { DeleteProfileDialogComponent } from './delete-profile-dialog/delete-profile-dialog.component';

// models
import { Profile } from 'src/app/models/profile.model';

// services
import { ProfileService } from 'src/app/services/profile.service';
import { FormBuilderService } from 'src/app/services/form-builder.service';
import { ErrorService } from 'src/app/services/error.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-profiles-info',
  templateUrl: './profiles-info.component.html',
  styleUrls: ['./profiles-info.component.css']
})
export class ProfilesInfoComponent implements OnInit, OnChanges {
  @Input() currProfile: Profile;
  gamemodes: string[] = ['Main', 'Ironman', 'Hardcore Ironman', 'Ultimate Ironman'];

  editProfileForm: FormGroup;
  profileFilters: any[];

  isLoading: boolean;

  updating: boolean;

  constructor(
    private profileService: ProfileService,
    private formBuilderService: FormBuilderService,
    private errorService: ErrorService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void { }

  ngOnChanges(): void {
    this.isLoading = true;
    // gets the edit form for the current profile
    this.formBuilderService.editProfileForm(this.currProfile.username, this.currProfile.gamemode, (form) => {
      this.editProfileForm = form;
      // gets all filters for the current profile
      this.profileService.getProfileFilters(this.currProfile.id, (filters) => {
        this.profileFilters = filters;
        this.isLoading = false;
      }, (err) => {
        console.log(err); // todo handle error
      });
    });
  }

  /**
   * Deletes the current selected profile. Presents a popup confirmation to the user prior to deleting.
   * On success, navigates to the new selected profile's page or to the add profile page
   * if no current profile exists.
   */
  deleteProfile() {
    this.dialog.open(DeleteProfileDialogComponent, {
      data: this.currProfile,
      autoFocus: false,
      panelClass: 'delete-dialog',
      width: '300px'
    }).afterClosed().subscribe(result => {
      if(result) {
        // deletes the current profile
        this.profileService.deleteProfile(this.currProfile.id, (result) => { 
          this.profileService.getUserProfiles((profiles) => {
            this.errorService.openSuccessSnackbar(this.currProfile.username +' has been successfully deleted!')
            // gets the new selected profile
            this.profileService.currProfile.pipe(take(1)).subscribe(profile => {
              if(profile) {
                // navigates to the new selected profile's page
                this.router.navigate(['/profiles'], { queryParams: { username: profile.username }});
              } else {
                // navigates to the add profile page
                this.router.navigate(['/profiles/add']);
              }
            });
          }, (err) => {
            console.log(err); // todo handle error
          });
        }, (err) => {
          console.log(err); // todo handle err
        });
      }
    })
  }

  updateProfile() {
    this.updating = true;
    // updates the current profile
    this.profileService.updateProfile(this.currProfile.id, (result) => {
      this.profileService.getUserProfiles((profiles) => {
        this.errorService.openSuccessSnackbar(this.currProfile.username +' has been successfully updated!', {
          duration: true
        })
        this.updating = false;
      }, (err) => {
        console.log(err); // todo handle error (500)...
      });
    }, (err) => {
      this.updating = false;
      if(err.status === 409) {
        // 409 - invalid profile
        this.errorService.openErrorSnackbar('Invalid profile! Please update your username and/or gamemode.')
      } else if(err.status === 503) {
        // 503 - OSRS API is down
        this.errorService.openErrorSnackbar('The OSRS API appears to be down, please try again later!')      
      }
      console.log(err); // todo handle error (500...)
    }); 
  }

  editProfile(profileData) {
    // edits the current profile
    this.profileService.editProfile(this.currProfile.id, profileData, (result) => {
      this.profileService.getUserProfiles((profiles) => {
      }, (err) => {
        console.log(err); // todo handle error
      });
    }, (err) => {
      if(err.status === 406) {
        // 406 - profile already exists
        this.errorService.openErrorSnackbar('Profile \"'+ profileData.username +'\" already exists!', {
          duration: true
        });
      }
      console.log(err); //todo handle error (500)
    });
  }

  setProfileFilter(filterId) {
    // sets the specified filter for the current profile
    this.profileService.setProfileFilter(this.currProfile.id, filterId, (result) => {
    }, (err) => {
      console.log(err); // todo handle err
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