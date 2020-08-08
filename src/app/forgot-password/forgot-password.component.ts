import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

// services
import { FormBuilderService } from '../services/form-builder.service';
import { SecurityService } from '../services/security.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ErrorService } from '../services/error.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  verified: boolean;

  isLoading: boolean;

  constructor(
    private securityService: SecurityService,
    private userSerivce: UserService,
    private formBuilder: FormBuilderService,
    private errorService: ErrorService,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true;
    // gets the forgot password form
    this.formBuilder.forgotPasswordForm(form => {
      this.forgotPasswordForm = form;
      this.isLoading = false;
    });
  }

  resolved(token) {
    // verifies this recaptcha token
    this.securityService.verifyRecaptchaToken(token, (err, result) => {
      if(!err) {
        this.verified = result;
      } else {
        console.log(err); // todo handle error (500 possible)
      }
    })
  }

  submit() {
    const email = this.forgotPasswordForm.get('email').value;
    // sends password reset request to this email (if it is a registered email)
    this.userSerivce.forgotPassword(email, (result) => {
      // routes to the login page
      this.router.navigateByUrl('login');
      this.errorService.openSuccessSnackbar('Password reset request has been sent!', {
        duration: true
      })
    }, (err) => {
      console.log(err); // todo handle error (500 possible)
    })
  }
  
  getErrorMessage(formControl: AbstractControl) {
    if(formControl.hasError('email')) {
      return 'Not a valid email'
    } else if(formControl.hasError('required')) {
      return 'Required'
    }  
  }

}
