import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";


/**
 * This class gets collection log data for the current profile (TODO)
 */

@Injectable({
  providedIn: 'root'
})
export class CollectionLogService {

  constructor(private http: HttpClient) { }

  /**
   * Gets the full collection log for this user profile.
   * Errors 401 and 500 possible.
   * @param profileId the specifed profile's id
   */
  getCollectionLog(profileId, done, callback) {
    this.http.get("/profile/"+ profileId +"/collection-log").subscribe(collectionLog => {
      done(collectionLog);
    }, err => {
      callback(err);
    });
  }

   /**
   * Gets all collection log entries for this user profile and specified category.
   * Errors 401 and 500 possible.
   * @param profileId the specified profile's id
   * @param category the specified collection log category
   */
  getCategoryLogs(profileId, category, done, callback) {
    this.http.get("/profile/"+ profileId +"/collection-log/"+ category).subscribe(categoryLogs => {
      done(categoryLogs);
    }, err => {
      callback(err);
    });
  }

  /**
   * Updates this user profile's collection log 'obtained' status for all items of the specified type.
   * Errors 401 and 500 possible.
   * @param profileId the specified profile's id
   * @param item the specified item to update
   */
  updateLog(profileId, item, done, callback) {
    this.http.post("/profile/"+ profileId +"/collection-log/"+ item, null).subscribe(result => {
      done(result);
    }, err => {
      callback(err);
    });
  }

  /**
   * Gets all collection log categories. Error 500 possible.
   */
  getCategories(done, callback) {
    this.http.get("/collection-log/categories").subscribe(categories => {
      done(categories);
    }, err => {
      callback(err);
    });
  }

}