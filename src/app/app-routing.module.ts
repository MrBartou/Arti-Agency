import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { TeamComponent } from './team/team.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './dashboard/home/home.component';
import { ProjectComponent } from './dashboard/project/project.component'
import { PoleDevWebComponent } from './pole-dev-web/pole-dev-web.component';

const routes: Routes = [
  { path: '', component: AcceuilComponent },
  { path: 'login', component: LoginComponent },
  { path: 'teams', component: TeamComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'admin/home', component: HomeComponent},
  { path: 'admin/home/project', component: ProjectComponent},
  { path: 'pole-dev-web', component: PoleDevWebComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
