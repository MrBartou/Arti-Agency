import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ProjetComponent } from './projet/projet.component';

const routes: Routes = [
  { path: '', component: AcceuilComponent },
  { path: 'login', component: LoginComponent },
  { path: 'projet', component: ProjetComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
