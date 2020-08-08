import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http: HttpClient) { }

  /**
   * Hashes the provided password using md5. 
   * This hashed password is then hashed and salted in the backend using bcrypt.
   * @param password the password to hash
   */
  hash(password, callback) {
    callback(Md5.hashStr(password));
  }

  /**
   * verifies this recaptcha token with google's recaptcha api
   * @param token recaptcha token
   */
  verifyRecaptchaToken(token, callback) {
    this.http.get('/recaptcha/verify/'+ token).subscribe(result => {
      callback(null, result);
    }, (err) => {
      callback(err, null);
    })
  }

}
