import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

// services
import { ProfileService } from '../services/profile.service';
import { OverviewService } from '../services/overview.service';

// models
import { Profile } from '../models/profile.model';

@Component({
  selector: 'app-generate-task',
  templateUrl: './generate-task.component.html',
  styleUrls: ['./generate-task.component.css']
})
export class GenerateTaskComponent implements OnInit {

  currProfile: Profile;

  constructor(
    private overviewService: OverviewService, 
    private profileService: ProfileService) { }

  ngOnInit(): void {
    // gets the current user profile
    // this.profileService.currProfile.pipe(take(1)).subscribe(profile => {
    //   this.currProfile = profile;

    //   this.overviewService.getCategoryOverview(profile.id, "Bosses", (err, categoryOverview) => {
    //     if(err) return console.log(err); // todo handle error
    //     console.log(categoryOverview);
    //   })

    // });
  }

}
