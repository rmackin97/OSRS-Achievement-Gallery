import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  profilesSection: boolean;
  generalSection: boolean;

  constructor() { }

  ngOnInit(): void {
    // sets the default component view to profiles
    document.getElementById("profiles-btn").classList.add("selected");
  
    this.profilesSection = true;
    this.generalSection = false;
  }

  renderSection(section): void {
    // sets the specified section's button to selected
    let elements = document.getElementsByClassName("selected");
    for(let i = 0; i < elements.length; i++){
      elements[i].classList.remove("selected");
    }
    document.getElementById(section+"-btn").classList.add("selected");

    // triggers the specified category component type to render
    section == "profiles" ? this.profilesSection = true : this.profilesSection = false;
    section == "general" ? this.generalSection = true : this.generalSection = false;
  }
}
