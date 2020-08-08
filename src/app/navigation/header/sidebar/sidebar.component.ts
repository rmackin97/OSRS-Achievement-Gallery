import { Component, OnInit, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() toggle: boolean;
  @Output() close = new EventEmitter();

  constructor(private eRef: ElementRef) { }

  ngOnInit(): void { }

  closeSidebar(){
    this.close.emit();
  }

  @HostListener("document:click", ["$event"])
  onClick(event){
    if(!this.eRef.nativeElement.contains(event.target) && this.toggle &&
      event.target.className !== "material-icons menu-button"){
        this.close.emit();
    } 
  }

}
