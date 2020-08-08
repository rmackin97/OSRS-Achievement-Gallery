import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { HomeComponent } from "./home/home.component"
import { OverviewComponent } from "./overview/overview.component";
import { CollectionLogComponent } from "./collection-log/collection-log.component";
import { GenerateTaskComponent } from "./generate-task/generate-task.component";
import { ProfilesComponent } from './profiles/profiles.component';
import { LandingComponent } from './landing/landing.component';
import { VerifyComponent } from './verify/verify.component';
import { UnverifiedComponent } from './unverified/unverified.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


// guards
import { LoggedGuardService as LoggedGuard } from './services/guards/loggedGuard.service';
import { VerifiedGuardService as VerifiedGuard } from './services/guards/verified-guard.service';
import { UnloggedGuardService as UnloggedGuard } from './services/guards/unloggedGuard.service';
import { UnverifiedGuardService as UnverifiedGuard } from './services/guards/unverifiedGuard.service';

// profile guards
import { CurrProfileGuardService as CurrentProfileGuard } from './services/guards/profile-guards/currProfileGuard.service';
import { HasProfilesGuardService as HasProfilesGuard } from './services/guards/profile-guards/has-profile-guard.service';
import { ValidProfileGuardService as ValidProfileGuard } from './services/guards/profile-guards/valid-profile-guard.service';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  
  // landing page components
  { path: "login", component: LandingComponent, canActivate: [UnloggedGuard] },
  { path: "register", component: LandingComponent, canActivate: [UnloggedGuard] },

  // local user verification components
  { path: "unverified", component: UnverifiedComponent, canActivate: [LoggedGuard, UnverifiedGuard] },
  { path: "verify/email/:token", component: VerifyComponent, canActivate: [UnloggedGuard] },

  // local user password reset components 
  { path: "forgot/password", component: ForgotPasswordComponent, canActivate: [UnloggedGuard] },
  { path: "password/reset/:token", component: ResetPasswordComponent, canActivate: [UnloggedGuard] },

  // account components
  { path: "account", component: AccountComponent, canActivate: [LoggedGuard, VerifiedGuard] },

  // profile components
  { path: "profiles", children: [
    { path: "", component: ProfilesComponent, runGuardsAndResolvers: 'paramsOrQueryParamsChange',
      canActivate: [LoggedGuard, VerifiedGuard, HasProfilesGuard, ValidProfileGuard] },
    { path: "add", component: ProfilesComponent, 
      canActivate: [LoggedGuard, VerifiedGuard] }
  ]},

  { path: "overview", component: OverviewComponent, canActivate: [LoggedGuard, VerifiedGuard] },
  { path: "collection-log", component: CollectionLogComponent, 
    canActivate: [LoggedGuard, VerifiedGuard, CurrentProfileGuard]
  },
  { path: "generate-task", component: GenerateTaskComponent, canActivate: [LoggedGuard, VerifiedGuard] },

  { path: "**", redirectTo: "/home", pathMatch: "full" } // todo 404 invalid page component
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled'
    })],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
