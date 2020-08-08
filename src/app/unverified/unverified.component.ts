import { Component, OnInit } from '@angular/core';

// services
import { UserService } from '../services/user.service';

/**
 * Whenever an unverified user logins in they will be redirected to this component; 
 * upon navigating here they are immediately logged out and prompted to verify their email.
 * 
 * This ensures that an unverified user can not be logged in (beyond this page).
 */

 // todo resend verifcation email button
@Component({
  selector: 'app-unverified',
  templateUrl: './unverified.component.html',
  styleUrls: ['./unverified.component.css']
})
export class UnverifiedComponent implements OnInit {

  email: string;
  userId: number;

  canResend: boolean = true;
  disabled: boolean;

  isLoading: boolean;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.isLoading = true;
    // gets the current unverified (local) user
    this.userService.getCurrentLocalUser((user) => {
      this.email = user.email;
      this.userId = user.userId;

      // logs out the current (unverified) user
      this.userService.userLogout((result) => {
        this.isLoading = false;
      }, (err) => {
        console.log(err); // todo handle err (500 possible)?
      });
    }, (err) => {
      console.log(err); // todo handle err (500 and 401, though route guard should prevent 401, possible)
    });
  }

  resendEmail() {
    // resends the verifcation email to this user
    this.userService.resendEmailToken(this.userId, (result) => {
      this.canResend = false;
    }, (err) => {
      console.log(err); // todo handle error (500 possible)
    });
  }

}
