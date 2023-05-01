import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ProjetComponent } from './projet/projet.component';
import { MenuComponent } from './shared/menu/menu.component';
import { TeamComponent } from './team/team.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactComponent } from './contact/contact.component';
import { PoleDevMobileComponent } from './pole-dev-mobile/pole-dev-mobile.component';
import { PoleDevWebComponent } from './pole-dev-web/pole-dev-web.component';
import { CreationMaquetteComponent } from './creation-maquette/creation-maquette.component';
import { CreationLogoComponent } from './creation-logo/creation-logo.component';


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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
