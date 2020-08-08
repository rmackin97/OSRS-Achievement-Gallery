import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';

// models
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currUserSource: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  currUser = this.currUserSource.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Gets the current logged in user.
   * 
   * Error 401 is returned if no user is logged in.
   */
  getCurrentUser(done, callback) {  
    this.http.get('/user/current').subscribe(user => {
      this.setCurrUser(new User(user));
      done(user);
    }, (err) => {
      callback(err);
    });
  }

  /**
   * Registers the local user specified by the provided email and password. 
   * Returns this user on success; or an error on failure.
   * 
   * Error 409 is returned if a user with this email already exists.
   * @param email the user's email
   * @param passwordEnc the user's password; encrypted
   */
  registerUser(email, passwordEnc, done, callback) {
    this.http.post('/user/register', {
      email: email,
      password: passwordEnc
    }).subscribe(user => {
      done(user);
    }, (err) => {
      callback(err);
    });
  }

  /**
   * Logs in the local user specified by the provided email and password. 
   * Returns the logged in user on success; or an error on failure.
   * 
   * Error 401 is returned if login credentials are invalid or user does not exist. 
   * @param email the user's email
   * @param passwordEnc the user's password; encrypted
   */
  userLogin(email, passwordEnc, done, callback) {
    this.http.post('/user/login', {
      email: email,
      password: passwordEnc
    }).subscribe(user => {
      this.setCurrUser(new User(user));
      done(user);
    }, (err) => {
      callback(err);
    });
  }

  /**
   * Gets the current logged in local user, or null if the calling user has no local user.
   */
  getCurrentLocalUser(done, callback) {
    this.http.get('/user/current/local').subscribe(user => {
      done(user);
    }, (err) => {
      callback(err);
    })
  }

  /**
   * Gets the current logged in google user, or null if the calling user has no google user.
   */
  getCurrentGoogleUser(done, callback) {
    this.http.get('/user/current/google').subscribe(user => {
      done(user);
    }, err => {
      callback(err);
    })
  }

  /**
   * Verifies the local user's email that this token belongs to.
   * 
   * Error 406 is returned if this token is invalid.
   * @param token the token specified by this url
   */
  verifyEmailToken(token, done, callback) {
    this.http.get('/verify/email/'+ token).subscribe(user => {
      done(user);
    }, (err) => {
      callback(err);
    });
  }

  /**
   * Resends the email verifcation link to the user corresponding to the provided userId.
   * 
   * Error 500 is returned on any failure; otherwise true is returned on success.
   * @param userId the userId of the specified user
   */
  resendEmailToken(userId, done, callback) {
    this.http.get('/verify/email/'+ userId +'/resend/token').subscribe(result => {
      done(result);
    }, (err) => {
      callback(err);
    });
  }

  /**
   * Sends a password reset email to the provided email. Returns true on success;
   * otherwise false if no local user exists for the provided email.
   * 
   * Error 500 is returned on any failure.
   * Note: not throwing an error as not to indicate whether or not a user is signed up by an email
   * @param email the specified user email
   */
  forgotPassword(email, done, callback) {
    this.http.get('/password/reset/'+ email +'/forgot').subscribe(result => {
      done(result);
    }, (err) => {
      callback(err);
    });
  }

/**
 * Returns true if this password reset token exists.
 * 
 * Error 406 is returned if this token is invalid
 * @param token the token specified by this url
 */
  verifyPasswordToken(token, done, callback) {
    this.http.get('/verify/password/'+ token).subscribe(result => {
      done(result);
    }, (err) => {
      callback(err);
    });
  }

  /**
   * Resets a users password using a password reset token. Returns true on success; otherwise
   * error 406 or 500 is returned on failure.
   * 
   * Error 406 is returned if this token is invalid.
   * @param token the token specified by this url
   * @param newPassword the new password provided by this user
   */
  tokenPasswordReset(token, newPassword, done, callback) {
    this.http.post('/password/reset/'+ token +'/forgot', { password: newPassword }).subscribe(user => {
      done(user);
    }, (err) => {
      callback(err);
    });
  }

  /**
   * Logs out the current user; sets the current user to null.
   */
  userLogout(done, callback) {
    this.http.post('/user/logout', null).subscribe(result => {
      this.setCurrUser(null);
      done(result);
    }, (err) => { 
      this.setCurrUser(null);
      callback(err);
    });
  }

  /**
   * Returns true if a user is logged in; false otherwise.
   */
  hasUser() {
    if(this.currUserSource.getValue()) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Returns true if the logged in user is verified; false otherwise (or if no user is logged in).
   */
  isVerified() {
    if(this.hasUser() && this.currUserSource.getValue().verified) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Sets the current user to a new user or null; the latter indicates that no user is logged in.
   * @param user the new user (or null)
   */
  setCurrUser(user: User | null) {
    this.currUserSource.next(user);
  }

}