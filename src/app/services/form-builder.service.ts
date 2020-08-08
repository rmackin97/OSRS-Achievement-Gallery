import { Injectable } from '@angular/core';

import { FormControl, FormBuilder, Validators, FormGroup, FormArray, AbstractControl } from '@angular/forms';

import { confirmPassword } from '../helpers/confirm-password.validator';
import { editUsername } from '../helpers/edit-username.validator';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {

  constructor(private formBuilder: FormBuilder) { }

  /**
   * Form used to register a user
   */
  registerForm(callback) {
    const registerForm = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6)])
    }, {
      validators: [
        confirmPassword('password', 'confirmPassword')
      ]
    });  
    callback(registerForm);
  }

  /**
   * Form used to login a user
   */
  loginForm(callback) {
    const loginForm = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
    callback(loginForm);
  }

  /**
   * Form used to submit a password reset request (forgot password)
   */
  forgotPasswordForm(callback) {
    const forgotPasswordForm = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
    callback(forgotPasswordForm);
  }

  /**
   * Form used to reset your password (forgot password)
   */
  forgotPasswordResetForm(callback) {
    const forgotPasswordResetForm = this.formBuilder.group({
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6)])
    }, {
      validators: [
        confirmPassword('password', 'confirmPassword')
      ]
    });
    callback(forgotPasswordResetForm);
  }

  /**
   * Form used to register a profile
   */
  registerProfileForm(callback) {
    const registerProfileForm = this.formBuilder.group({
      username: new FormControl(null, [
        Validators.required, Validators.maxLength(12), Validators.pattern('^[a-zA-Z0-9_ ]*$')
      ]),
      gamemode: new FormControl(null, [Validators.required])
    });
    callback(registerProfileForm);
  }

  editProfileForm(username, gamemode, callback) {
    const profileNameChangeForm = this.formBuilder.group({
      username: new FormControl(username, [
        Validators.required, Validators.maxLength(12), Validators.pattern('^[a-zA-Z0-9_ ]*$')
      ]),
      gamemode: new FormControl(gamemode, [Validators.required])
    });
    callback(profileNameChangeForm);
  }




}
