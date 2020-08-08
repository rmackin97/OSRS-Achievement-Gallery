import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

/**
 * This class gets profile overview data for the current profile (TODO) 
 */

@Injectable({
  providedIn: 'root'
})
export class OverviewService {

  constructor(private http: HttpClient) { }

  /**
   * Gets all collection log scores for this user profile and collection log category.
   * @param profileId the id of the specified profile
   * @param category the specified collection log category
   */
  getCategoryScores(profileId, category, callback) {
    this.http.get('/profile/'+ profileId +'/overview/'+ category +'/scores').subscribe((categoryScores) => {
      callback(null, categoryScores);
    }, (err) => {
      callback(err, null);
    });
  }
}
