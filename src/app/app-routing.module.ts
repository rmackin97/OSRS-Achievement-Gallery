import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { HomeComponent } from "./home/home.component"
import { OverviewComponent } from "./overview/overview.component";
import { CollectionLogComponent } from "./collection-log/collection-log.component";
import { GenerateTaskComponent } from "./generate-task/generate-task.component";
import { SettingsComponent } from "./settings/settings.component";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "overview", component: OverviewComponent },
  { path: "collection-log", component: CollectionLogComponent },
  { path: "generate-task", component: GenerateTaskComponent },
  { path: "settings", component: SettingsComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
