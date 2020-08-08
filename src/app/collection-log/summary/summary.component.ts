import { Component, OnInit, Input } from '@angular/core';

// services
import { CollectionLogService } from "../../services/collection-log.service";
import { ProfileService } from "../../services/profile.service";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  @Input() profileId: number;

  collectionLog: Object[];
  summary: Object = {};

  isLoading: boolean;

  constructor(private collectionLogService: CollectionLogService, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.isLoading = true;
    // gets all collection log entries for this user profile
    // this.collectionLogService.getCollectionLog(this.profileId, (err, logs) => {
    //   if(err) return console.log(err); // todo handle err
    //   this.collectionLog = logs;

    //   // calculates collection log summary
    //   this.getSummary((summary) => {
    //     this.summary = summary;

    //     this.isLoading = false;
    //   })
    // });




    // // retrieves the currently selected profile
    // this.profileService.getSelectedProfile((data) => {
    //   this.selectedProfile = data;

    //   // retrieves collection log stats for the currently selected profile
    //   this.collectionLogService.getStats(this.selectedProfile.toLowerCase(), (data) => {
    //     this.stats = data;

    //     // retrives recently obtained uniques for the currently selected profile
    //     this.collectionLogService.getRecentUniques(this.selectedProfile.toLowerCase(), (data) => {
    //       this.uniques = data;

    //       this.loaded = true;
    //     }, (err) => {
    //       console.log(err); //todo handle error somehow or ensure it never occurs
    //     });
    //   }, (err) => {
    //     console.log(err); //todo handle error somehow or ensure it never occurs
    //   });
    // }, (err) => console.log(err)); // todo handle error, there is no current profile (maybe route to profile creation)
  }

  getSummary(callback) {
    let obtained = 0, total = 0;
    let summary = {};

    for(const categoryLogs of Object.values(this.collectionLog)) {
      const category = categoryLogs['category'];
      const categorySummary = this.categorySummary(categoryLogs['logs']);

      obtained += categorySummary[0];
      total += categorySummary[1];

      summary[category] = {};
      summary[category].obtained = categorySummary[0];
      summary[category].total = categorySummary[1];
      summary[category].percent = categorySummary[0] / categorySummary[1] * 100;
    }

    summary['All'] = {};
    summary['All'].obtained = obtained;
    summary['All'].total = total;
    summary['All'].percent = obtained / total * 100;

    callback(summary);
  }

  categorySummary(categoryLogs) {
    let obtained = 0, total = 0;

    for(const activityLogs of Object.values(categoryLogs)) {
      for(const entry of activityLogs['logs']) {
        total++;
        if(entry.ProfileCollectionLogs.obtained) {
          obtained++;
        }
      }
    }

    return [obtained, total];
  }

}
