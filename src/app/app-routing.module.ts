import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { TeamComponent } from './team/team.component';

const routes: Routes = [
  { path: '', component: AcceuilComponent },
  { path: 'login', component: LoginComponent },
  { path: 'teams', component: TeamComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
