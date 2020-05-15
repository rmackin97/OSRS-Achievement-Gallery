import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  skillsCategory: boolean;
  bossesCategory: boolean;
  cluesCategory: boolean;

  type: string;

  constructor() { }

  ngOnInit(): void {
    // sets the default component view to summary
    document.getElementById("skills-btn").classList.add("selected");
  
    this.skillsCategory = true;
    this.bossesCategory = false;
    this.cluesCategory = false;

    this.type = "skills";
  }

  renderCategory(category: string): void {
    // sets the specified category's button to selected
    let elements = document.getElementsByClassName("selected");
    for(let i = 0; i < elements.length; i++){
      elements[i].classList.remove("selected");
    }
    document.getElementById(category+"-btn").classList.add("selected");

    // triggers the specified category component type to render
    category == "summary" ? this.skillsCategory = true : this.skillsCategory = false;
    category == "bosses" ? this.bossesCategory = true : this.bossesCategory = false;
    category == "clues" ? this.cluesCategory = true : this.cluesCategory = false;

    this.type = category;
  }

}
