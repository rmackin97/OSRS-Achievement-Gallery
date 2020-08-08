import { Component, OnInit } from '@angular/core';
import moment  from 'moment';

// services
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  localUser: any;
  googleUser: any;

  isLoading: boolean;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.isLoading = true;
    // gets the current local user for the calling user (if one exists)
    this.userService.getCurrentLocalUser(user => {
      this.localUser = user;
      console.log(this.localUser);
      // gets the current google user for the calling user (if one exists)
      this.userService.getCurrentGoogleUser(user => {
        this.googleUser = user;
        console.log(this.googleUser)
        this.isLoading = false;
      }, err => {
        console.log(err); // todo handle err
      })
    }, err => {
      console.log(err); // todo handle err
    })
  }

  getUserEmail(): string {
    if(this.localUser) {
      return this.localUser.email;
    } else if(this.googleUser) {
      return this.googleUser.email;
    }
  }

  getUserCreationDate(): string {
    if(this.localUser && this.googleUser) {
      const localUserCreated = moment(this.localUser.createdAt);
      const googleUserCreated = moment(this.googleUser.createdAt);

      if(localUserCreated < googleUserCreated) {
        return localUserCreated.format('MM-DD-YYYY');
      } else {
        return googleUserCreated.format('MM-DD-YYYY'); 
      }
    } else if(this.localUser) {
      return moment(this.localUser.createdAt).format('MM-DD-YYYY');
    } else if(this.googleUser) {
      return moment(this.googleUser.createdAt).format('MM-DD-YYYY');
    }
  }

}
