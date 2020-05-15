import { Component, OnInit } from '@angular/core';

// services
import { CollectionLogService } from "../../services/collection-log.service";
import { ProfileService } from "../../services/profile.service";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  selectedProfile: string;
  stats: {};
  uniques: {};

  constructor(private collectionLogService: CollectionLogService, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.getCurrentProfile((data) => {
      this.selectedProfile = data;

      this.getRecentUniques(this.selectedProfile);
      this.getStats(this.selectedProfile);

    }, (err) => console.log(err)); // error, there is no current profile (maybe route to profile creation)
  }

  getStats(selectedProfile): void {
    this.collectionLogService.getStats(selectedProfile.toLowerCase())
    .subscribe(stats => {
      this.stats = stats;
      // console.log(stats);
    });
  }

  getRecentUniques(selectedProfile): void {
    this.collectionLogService.getRecentUniques(selectedProfile.toLowerCase())
      .subscribe(uniques => {
        this.uniques = uniques;
        // console.log(uniques);
      })
  }

  defaultSort(){
    return 0;
  }
}
