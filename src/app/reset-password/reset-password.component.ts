import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, AbstractControl } from '@angular/forms';

// services
import { UserService } from 'src/app/services/user.service';
import { FormBuilderService } from 'src/app/services/form-builder.service';
import { SecurityService } from '../services/security.service';
import { ErrorService } from '../services/error.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  token: string;
  hide: boolean = true; // field to hide or show password

  passwordResetForm: FormGroup;

  isLoading: boolean;

  constructor(
    private userService: UserService, 
    private formBuilder: FormBuilderService,
    private securityService: SecurityService,
    private errorService: ErrorService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.token = this.route.snapshot.params.token;
    // verifies that this token is a valid password reset token
    this.userService.verifyPasswordToken(this.token, (result) => {
      // gets the password reset form
      this.formBuilder.forgotPasswordResetForm(form => {
        this.passwordResetForm = form;
        this.isLoading = false;
      });
    }, (err) => {
      // invalid token; route home
      if(err.status === 406) return this.router.navigate(['home']); 
      return console.log(err); // todo handle error (406 or 500 possible)
    });
  }

  resetPassword() {
    const newPassword = this.passwordResetForm.get('password').value;
    this.securityService.hash(newPassword, (encPassword) => {
      this.userService.tokenPasswordReset(this.token, encPassword, (result) => {
        this.router.navigate(['login']);
        this.errorService.openSuccessSnackbar('Your password has successfully been reset!', {
          duration: true
        })
      }, (err) => {
        console.log(err); // todo handle err (406, though 406 should be handled in ngOnInit, or 500 possible)
      });
    });
  }

  getErrorMessage(formControl: AbstractControl) {
    if(formControl.hasError('required')) {
      return 'Required'
    } else if(formControl.hasError('minlength')) {
      return 'Requires at least 6 characters'
    } else if(formControl.hasError('confirmPassword')) {
      return 'Passwords do not match'
    }    
  }

}
