import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collection-log',
  templateUrl: './collection-log.component.html',
  styleUrls: ['./collection-log.component.css']
})
export class CollectionLogComponent implements OnInit {
  summaryCategory: boolean;
  bossesCategory: boolean;
  raidsCategory: boolean;
  cluesCategory: boolean;
  minigamesCategory: boolean;
  otherCategory: boolean;

  type: string;

  constructor() { }

  ngOnInit(): void {
    // sets the default component view to summary
    document.getElementById("summary-btn").classList.add("selected");
  
    this.summaryCategory = true;
    this.bossesCategory = false;
    this.raidsCategory = false;
    this.cluesCategory = false;
    this.minigamesCategory = false;
    this.otherCategory = false;

    this.type = "summary";
  }

  renderCategory(category): void {
    // sets the specified category's button to selected
    let elements = document.getElementsByClassName("selected");
    for(let i = 0; i < elements.length; i++){
      elements[i].classList.remove("selected");
    }
    document.getElementById(category+"-btn").classList.add("selected");

    // triggers the specified category component type to render
    category == "summary" ? this.summaryCategory = true : this.summaryCategory = false;
    category == "bosses" ? this.bossesCategory = true : this.bossesCategory = false;
    category == "raids" ? this.raidsCategory = true : this.raidsCategory = false;
    category == "clues" ? this.cluesCategory = true : this.cluesCategory = false;
    category == "minigames" ? this.minigamesCategory = true : this.minigamesCategory = false;
    category == "other" ? this.otherCategory = true : this.otherCategory = false;

    this.type = category;
  }

}
