import { Component, OnInit, Input, OnChanges, DoCheck, ChangeDetectionStrategy } from '@angular/core';

// services
import { CollectionLogService } from "../../services/collection-log.service";

/**
 * This file is responsible for rendering the selected collection log category 
 * for the current user profile. 
 */

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnChanges {
  @Input() profileId: number;
  @Input() category: string;

  categoryLogs: any[];

  isLoading: boolean;

  constructor(private collectionLogService: CollectionLogService) { }

  ngOnInit(): void { }

  ngOnChanges(): void {
    this.isLoading = true;
    console.time("category "+this.category)
    this.collectionLogService.getCategoryLogs(this.profileId, this.category, (categoryLogs) => {
      this.categoryLogs = categoryLogs;
      this.isLoading = false;
      console.timeEnd("category "+this.category)
    }, (err) => {
      console.log(err); // todo handle err
    });
  }

  updateLog(itemName) {
    console.time("update "+this.category)
    // updates the profile collection logs associated with this item
    this.collectionLogService.updateLog(this.profileId, itemName, (result) => {
      this.updateCategoryLogs(itemName, () => {
        console.timeEnd("update "+this.category)
      });
    }, (err) => {
      console.log(err); // todo handle error
    });
  }

  updateCategoryLogs(itemName, callback) {
    for(const log of this.categoryLogs) {
      for(const item of log.value.items) {
        if(item.item === itemName) {
          item.ProfileCollectionLogs.obtained = !item.ProfileCollectionLogs.obtained;
          if(item.ProfileCollectionLogs.obtained) {
            log.value.obtained++;
          } else {
            log.value.obtained--;
          }
        }
      }
    }
    callback();
  }

}