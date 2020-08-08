import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfileDataService {

  constructor(private http: HttpClient) { }

  getBossData(profileId, callback) {
    this.http.get('/profile/'+ profileId +'/data/bosses').subscribe(data => {
      callback(null, data);
    }, err => {
      callback(err, null);
    });
  }

  getClueData(profileId, callback) {
    this.http.get('/profile/'+ profileId +'/data/clues').subscribe(data => {
      callback(null, data);
    }, err => {
      callback(err, null);
    });
  }

  getRaidData(profileId, callback) {
    this.http.get('/profile/'+ profileId +'/data/raids').subscribe(data => {
      callback(null, data);
    }, err => {
      callback(err, null);
    });
  }

  getSkillData(profileId, callback) {
    this.http.get('/profile/'+ profileId +'/data/skills').subscribe(data => {
      callback(null, data);
    }, err => {
      callback(err, null);
    });
  }
}
