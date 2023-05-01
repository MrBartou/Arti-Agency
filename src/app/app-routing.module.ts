import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ProjetComponent } from './projet/projet.component';
import { TeamComponent } from './team/team.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactComponent } from './contact/contact.component';
import { PoleDevMobileComponent } from './pole-dev-mobile/pole-dev-mobile.component';
import { PoleDevWebComponent } from './pole-dev-web/pole-dev-web.component';
import { CreationMaquetteComponent } from './creation-maquette/creation-maquette.component';
import { CreationLogoComponent } from './creation-logo/creation-logo.component';

const routes: Routes = [
  { path: '', component: AcceuilComponent },
  { path: 'login', component: LoginComponent },
  { path: 'projet', component: ProjetComponent },
  { path: 'teams', component: TeamComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'pole-dev-mobile', component: PoleDevMobileComponent},
  { path: 'pole-dev-web', component: PoleDevWebComponent},
  { path: 'creation-maquette', component: CreationMaquetteComponent},
  { path: 'creation-logo', component: CreationLogoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
