import { Component, OnInit, Input } from '@angular/core';

// services
import { OverviewService } from "../../services/overview.service";

@Component({
  selector: 'app-overview-category',
  templateUrl: './overview-category.component.html',
  styleUrls: ['./overview-category.component.css']
})
export class OverviewCategoryComponent implements OnInit {
  @Input() category: string;

  constructor(private overviewService: OverviewService) { }

  // skills are rank, level, xp
  // bosses and clues are rank, score

  ngOnInit(): void {
    
  }

}
