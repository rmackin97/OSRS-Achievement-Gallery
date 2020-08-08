import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { Router } from '@angular/router';

// services
import { UserService } from '../services/user.service';
import { ProfileService } from '../services/profile.service';
import { SecurityService } from '../services/security.service';
import { FormBuilderService } from '../services/form-builder.service';
import { ErrorService } from '../services/error.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  login: boolean = false;
  register: boolean = false;

  hide: boolean = true; // field to hide or show password

  registerForm: FormGroup;
  loginForm: FormGroup;
  
  isLoading: boolean;

  constructor(
    private userService: UserService, 
    private profileService: ProfileService,
    private securityService: SecurityService,
    private errorService: ErrorService,
    private formBuilderService: FormBuilderService,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.router.url === '/login' ? this.login = true : this.register = true;
    // gets register form
    this.formBuilderService.registerForm(form => {
      this.registerForm = form;
      // gets login form
      this.formBuilderService.loginForm(form => {
        this.loginForm = form;
        this.isLoading = false;
      });
    });
  }

  userLogin(loginData) {
    const email = loginData.email;
    const password = loginData.password;
    this.securityService.hash(password, (passwordEnc) => {
      this.userService.userLogin(email, passwordEnc, (user) => {
        // checks if this user is verified
        if(user.verified) {
          // gets this verified user's profiles
          this.profileService.getUserProfiles((profiles) => {
            // routes verified user to the home page
            this.router.navigateByUrl('home');
          }, (err) => {
            console.log(err); // todo handle error (500)
          });
        } else {
          // routes unverified user to the unverified page
          this.router.navigateByUrl('unverified');
        }
      }, (err) => {
        if(err.status === 401) {
          // 401 - invalid login credentials or this user does not exist
          this.errorService.openErrorSnackbar('Invalid login credentials!')
        }
        // 500 should be redirected to internal error 500 page
        console.log(err); // todo handle error (500)
      });
    });
  }

  registerUser(registerData) {
    const email = registerData.email;
    const password = registerData.password;
    this.securityService.hash(password, (passwordEnc) => {
      this.userService.registerUser(email, passwordEnc, (user) => {
        const loginData = {
          email: email,
          password: password
        };
        // logs in the new unverified user
        this.userLogin(loginData);
      }, (err) => {
        if(err.status === 409) {
          // 409 - user already exists
          this.errorService.openErrorSnackbar('This email appears to already belong to an existing account.');
        }
        // 500 should be redirected to internal error 500 page
        return console.log(err); // todo handle error (500)
      });
    });
  }

  getErrorMessage(formControl: AbstractControl) {
    if(formControl.hasError('email')) {
      return 'Not a valid email'
    } else if(formControl.hasError('required')) {
      return 'Required'
    } else if(formControl.hasError('minlength')) {
      return 'Requires at least 6 characters'
    } else if(formControl.hasError('confirmPassword')) {
      return 'Passwords do not match'
    }    
  }

}
