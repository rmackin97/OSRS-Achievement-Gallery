import { Component, OnInit } from '@angular/core';
import { Subject } from "rxjs";

// services
import { LoaderService } from "../services/loader.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  color = "primary";
  mode = "indeterminate";
  value = "50";

  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
  }

}
