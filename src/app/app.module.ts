import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./modules/material.modules";
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// custom pipes
import { ReplaceUnderscore } from "./helpers/replace-underscore.pipe";

//services
import { LoaderService } from "./services/loader.service";

// providers
import { FormBuilder } from "@angular/forms";

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { OverviewComponent } from './overview/overview.component';
import { CollectionLogComponent } from './collection-log/collection-log.component';
import { GenerateTaskComponent } from './generate-task/generate-task.component';
import { SummaryComponent } from './collection-log/summary/summary.component';
import { CategoryComponent } from './collection-log/category/category.component';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { LoaderInterceptor } from './loader/loader.interceptor';
import { ProfileStubComponent } from './header/profile-stub/profile-stub.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsProfilesComponent } from './settings/settings-profiles/settings-profiles.component';
import { SettingsGeneralComponent } from './settings/settings-general/settings-general.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SidebarComponent,
    OverviewComponent,
    CollectionLogComponent,
    GenerateTaskComponent,
    SummaryComponent,
    CategoryComponent,
    FooterComponent,
    LoaderComponent,
    ReplaceUnderscore,
    ProfileStubComponent,
    SettingsComponent,
    SettingsProfilesComponent,
    SettingsGeneralComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule 
  ],
  providers: [
    FormBuilder,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
