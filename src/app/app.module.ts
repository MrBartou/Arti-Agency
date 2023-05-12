import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './site/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './shared/loader/loader.component';
import { AcceuilComponent } from './site/acceuil/acceuil.component';
import { ProjetComponent } from './site/projet/projet.component';
import { MenuComponent } from './shared/menu/menu.component';
import { HomeComponent } from './dashboard/home/home.component';
import {NgOptimizedImage} from "@angular/common";
import { ProjectComponent } from './dashboard/project/project.component';
import { TeamComponent } from './site/team/team.component';
import { ProfileComponent } from './site/profile/profile.component';
import { ContactComponent } from './site/contact/contact.component';
import { PoleDevWebComponent } from './site/pole-dev-web/pole-dev-web.component';
import { CreationMaquetteComponent } from './site/creation-maquette/creation-maquette.component';
import { Page404Component } from './shared/page404/page404.component';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './dashboard/form/form.component';
import { TestComponent } from './dashboard/test/test.component';
import { PoleMarketingComponent } from './site/pole-marketing/pole-marketing.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AcceuilComponent,
    ProjetComponent,
    TeamComponent,
    ProfileComponent,
    LoaderComponent,
    HomeComponent,
    ProjectComponent,
    ContactComponent,
    MenuComponent,
    PoleDevWebComponent,
    CreationMaquetteComponent,
    Page404Component,
    FormComponent,
    TestComponent,
    PoleMarketingComponent,
  ],
  imports: [
    NgOptimizedImage,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
