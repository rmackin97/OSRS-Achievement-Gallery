import { Component, OnInit, Input } from '@angular/core';

// services
import { CollectionLogService } from "../../services/collection-log.service";
import { ProfileService } from "../../services/profile.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  // category type property
  @Input() category: string;
  selectedProfile: string;
  logs: {};

  constructor(private collectionLogService: CollectionLogService, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.getCurrentProfile((data) => {
      this.selectedProfile = data;

      this.getLogs(this.selectedProfile);

    }, (err) => console.log(err)); // error, there is no current profile (maybe route to profile creation)
  }

  getLogs(selectedProfile): void {
    this.collectionLogService.getLogs(this.category, selectedProfile.toLowerCase())
      .subscribe(logs => {
        this.logs = logs;
        console.log(logs);
      });   
  }

  updateLog(event): void {
    this.collectionLogService.updateLogs(event.target.id, this.selectedProfile.toLowerCase())
      .subscribe(result => {
        if(result){
          this.getLogs(this.selectedProfile);
        }
      });
  }

  defaultSort(){
    return 0;
  }
}
