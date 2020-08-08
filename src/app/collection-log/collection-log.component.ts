import { Component, OnInit, OnChanges } from '@angular/core';
import { take } from 'rxjs/operators';

// services
import { CollectionLogService } from "../services/collection-log.service";
import { ProfileService } from "../services/profile.service";

/**
 * This file is responsible for getting the current user profile; and 
 * displaying all collection log categories and selecting which category to render.
 */

@Component({
  selector: 'app-collection-log',
  templateUrl: './collection-log.component.html',
  styleUrls: ['./collection-log.component.css']
})
export class CollectionLogComponent implements OnInit {
  categories: string[] = [];

  category: string;
  profileId: number;

  isLoading: boolean;

  constructor(
    private collectionLogService: CollectionLogService, 
    private profileService: ProfileService) { }

  ngOnInit(): void {
    console.time("Collection Log Init")
    this.isLoading = true;
    // gets the current user profile
    this.profileService.currProfile.pipe(take(1)).subscribe(profile => {
      this.profileId = profile.id;

      // gets all collection log categories
      this.collectionLogService.getCategories((categories: { category: string }[]) => {
        for(const category of categories) {
          this.categories.push(category.category);
        }
        this.category = this.categories[0];

        this.isLoading = false;
        console.timeEnd("Collection Log Init")
      }, (err) => {
        console.log(err); // todo handle err
      });
    }, (err) => {
      console.log(err); // todo handle err
    });
  }

  selectCategory(category) {
    this.category = category;
  }

}
