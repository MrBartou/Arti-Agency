import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { TeamComponent } from './team/team.component';
import { ProfileComponent } from './profile/profile.component';
import { PoleDevMobileComponent } from './pole-dev-mobile/pole-dev-mobile.component';
import { PoleDevWebComponent } from './pole-dev-web/pole-dev-web.component';
import { CreationMaquetteComponent } from './creation-maquette/creation-maquette.component';

const routes: Routes = [
  { path: '', component: AcceuilComponent },
  { path: 'login', component: LoginComponent },
  { path: 'teams', component: TeamComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'pole-dev-mobile', component: PoleDevMobileComponent},
  { path: 'pole-dev-web', component: PoleDevWebComponent},
  { path: 'creation-maquette', component: CreationMaquetteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
