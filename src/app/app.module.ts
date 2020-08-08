import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./modules/material.modules";
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


// captcha
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

// custom pipes
import { ReplaceUnderscore } from "./helpers/replace-underscore.pipe";
import { ObjectEntries } from './helpers/objectEntries.pipe';

// app initialization
import { AppInitService } from './services/app-init.service';

// providers
import { FormBuilder } from "@angular/forms";

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './navigation/header/header.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './navigation/header/sidebar/sidebar.component';
import { OverviewComponent } from './overview/overview.component';
import { CollectionLogComponent } from './collection-log/collection-log.component';
import { GenerateTaskComponent } from './generate-task/generate-task.component';
import { SummaryComponent } from './collection-log/summary/summary.component';
import { CategoryComponent } from './collection-log/category/category.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { OverviewCategoryComponent } from './overview/overview-category/overview-category.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { LandingComponent } from './landing/landing.component';
import { VerifyComponent } from './verify/verify.component';
import { UnverifiedComponent } from './unverified/unverified.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProfilesCreateComponent } from './profiles/profiles-create/profiles-create.component';
import { ProfilesInfoComponent } from './profiles/profiles-info/profiles-info.component';
import { DeleteProfileDialogComponent } from './profiles/profiles-info/delete-profile-dialog/delete-profile-dialog.component';
import { AccountComponent } from './account/account.component';
 
export function initializeApp(appInitService: AppInitService) {
  return (): Promise<any> => { 
    return appInitService.init();
  }
}

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
    ObjectEntries,
    OverviewCategoryComponent,
    ProfilesComponent,
    LandingComponent,
    VerifyComponent,
    UnverifiedComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ProfilesCreateComponent,
    ProfilesInfoComponent,
    DeleteProfileDialogComponent,
    AccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    RecaptchaModule, 
    RecaptchaFormsModule,
    MatDialogModule
  ],
  entryComponents: [
    DeleteProfileDialogComponent,
  ],
  providers: [
    FormBuilder,
    AppInitService,
    { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [AppInitService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
