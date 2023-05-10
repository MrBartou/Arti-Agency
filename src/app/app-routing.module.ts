import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './dashboard/home/home.component';
import { ProjectComponent } from './dashboard/project/project.component';
import { LoginComponent } from './site/login/login.component';
import { AcceuilComponent } from './site/acceuil/acceuil.component';
import { ProjetComponent } from './site/projet/projet.component';
import { TeamComponent } from './site/team/team.component';
import { ProfileComponent } from './site/profile/profile.component';
import { ContactComponent } from './site/contact/contact.component';
import { PoleDevMobileComponent } from './site/pole-dev-mobile/pole-dev-mobile.component';
import { PoleDevWebComponent } from './site/pole-dev-web/pole-dev-web.component';
import { CreationMaquetteComponent } from './site/creation-maquette/creation-maquette.component';
import { CreationLogoComponent } from './site/creation-logo/creation-logo.component';
import { Page404Component } from './shared/page404/page404.component';

const routes: Routes = [
  { path: '', component: AcceuilComponent },
  { path: 'login', component: LoginComponent },
  { path: 'projet', component: ProjetComponent },
  { path: 'teams', component: TeamComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'admin/home', component: HomeComponent},
  { path: 'admin/home/project', component: ProjectComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'pole-dev-mobile', component: PoleDevMobileComponent},
  { path: 'pole-dev-web', component: PoleDevWebComponent},
  { path: 'creation-maquette', component: CreationMaquetteComponent},
  { path: 'creation-logo', component: CreationLogoComponent},
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
