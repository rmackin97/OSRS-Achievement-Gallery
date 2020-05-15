import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  toggle: boolean;

  constructor() { }

  ngOnInit(): void {
    this.toggle = false;
  }

  toggleSidebar(){
    this.toggle = !this.toggle;
  }

  closeSidebar(){
    this.toggle = false;
  }

}
