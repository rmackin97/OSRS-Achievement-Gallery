import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnChanges {
  @Input() status: String;
  @Output() toggle = new EventEmitter();

  constructor(private eRef: ElementRef) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.status.currentValue == "active"){
      document.getElementById("sidebar").className = "active";
    } else{
      document.getElementById("sidebar").className = "inactive";
    }
  }

  closeSidebar(){
    this.toggle.emit();
  }

  @HostListener("document:click", ["$event"])
  onClick(event){
    if(!this.eRef.nativeElement.contains(event.target) && this.status == "active" &&
      event.target.className != "toggle-btn" && event.target.parentNode.className != "toggle-btn" ){
      this.closeSidebar();
    } 
  }

}
