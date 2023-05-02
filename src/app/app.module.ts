import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './site/login/login.component';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './shared/loader/loader.component';
import { AcceuilComponent } from './site/acceuil/acceuil.component';
import { ProjetComponent } from './site/projet/projet.component';
import { MenuComponent } from './shared/menu/menu.component';
import { TeamComponent } from './team/team.component';
import { ProfileComponent } from './site/profile/profile.component';
import { ContactComponent } from './site/contact/contact.component';
import { PoleDevMobileComponent } from './site/pole-dev-mobile/pole-dev-mobile.component';
import { PoleDevWebComponent } from './site/pole-dev-web/pole-dev-web.component';
import { CreationMaquetteComponent } from './site/creation-maquette/creation-maquette.component';
import { CreationLogoComponent } from './site/creation-logo/creation-logo.component';
import { Page404Component } from './shared/page404/page404.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AcceuilComponent,
    ProjetComponent,
    TeamComponent,
    ProfileComponent,
    LoaderComponent,
    ContactComponent,
    PoleDevMobileComponent,
    MenuComponent,
    PoleDevWebComponent,
    CreationMaquetteComponent,
    CreationLogoComponent,
    Page404Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
