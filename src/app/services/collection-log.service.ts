import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

/**
 * This class gets collection log data for the current profile (TODO)
 */

 import { ProfileService } from "../services/profile.service";

@Injectable({
  providedIn: 'root'
})
export class CollectionLogService {

  constructor(private http: HttpClient, private profileService: ProfileService) { }

  getLogs(category: string, selectedProfile: string): Observable<any> {
    return this.http.get("http://localhost:8000/"+selectedProfile+"/collection-log/getLogs/"+category)
      .pipe(
        map(data => {
          return data;
        }), catchError(error => {
          return throwError("at CollectionLogService: getLogs("+category+")");
        })
      );
  }

  updateLogs(item: string, selectedProfile: string): Observable<any> {
    return this.http.post("http://localhost:8000/"+selectedProfile+"/collection-log/updateLogs", { 
      "item": item 
    })
      .pipe(
        map(res => { 
          return res["result"];
        }), catchError(error => {
          return throwError("at CollectionLogService: updateLogs("+item+")");
        })
      );
  }

  getStats(selectedProfile: string): Observable<any> {
    return this.http.get("http://localhost:8000/"+selectedProfile+"/collection-log/getStats")
      .pipe(
        map(data => {
          return data;
        }), catchError(error => {
          return throwError("at CollectionLogService: getStats()");
        })
      );
  }

  getRecentUniques(selectedProfile: string): Observable<any> {
    return this.http.get("http://localhost:8000/"+selectedProfile+"/collection-log/getRecentUniques")
      .pipe(
        map(data => {
          return data;
        }), catchError(error => {
          return throwError("at CollectionLogService: getRecentUniques()");
        })
      );
  }

}