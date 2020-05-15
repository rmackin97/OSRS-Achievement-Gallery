import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

/**
 * This class gets the current profile (TODO hardcoded rn)
 */

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  HARDCODE: string = "R3ltl0rd";

  constructor(private http: HttpClient) { }

  // model idea (server side obvi)
  // username, gamemode, combat level, ... whatever else might be cool to show immediately


  createProfile(username: string): Observable<any>  {
    return this.http.post("http://localhost:8000/profile/create", { 
      "username": username 
    })
      .pipe(
        map(res => { 
          return res["result"];
        }), catchError(error => {
          return throwError("at ProfileService: createProfile("+username+")");
        })
      );
  }

  changeProfile(){

  }

    // note that usernames are .toLowerCase() on the backend bc names are 
  // case insensitive in OSRS
  getCurrentProfile(resolve, reject) {
    this.http.get("http://localhost:8000/profile/getCurrentProfile").subscribe((data) => {
      resolve(data["selectedProfile"]);
    }, (err) => {
      reject(err);
    });
      // .pipe(
      //   map(res => {
      //     console.log(res);
      //     return res;
      //   }), catchError(error => {
      //     console.log(error);
      //     return throwError("at ProfileService: getCurrentProfile()");
      //   })
      // );
  }

  getAllProfiles(): Observable<any> {
    return this.http.get("http://localhost:8000/profile/getAllProfiles")
      .pipe(
        map(res => {
          return res;
        }), catchError(error => {
          return throwError("at ProfileService: getAllProfiles()");
        })
      );
  }

  // renameProfile? (eventually perhaps)

}
