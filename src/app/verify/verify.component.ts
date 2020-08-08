import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// services
import { UserService } from '../services/user.service';

/**
 * This component is used to verify an unverified local user. If the token provided by this url
 * is invalid then the user is redirected to the home page. 
 */

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  token: string;
  email: string;

  isLoading: boolean;

  constructor(
    private userService: UserService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.token = this.route.snapshot.params.token;
    // verifies the local user corresponding to this token
    this.userService.verifyEmailToken(this.token, (user) => {
      this.email = user.email;
      this.isLoading = false;
    }, (err) => {
      // invalid token; route home
      if(err.status === 406) return this.router.navigate(['home']); 
      // todo handle error (406 and 500 possible)
      return console.log(err); 
    }); 
  }

}
