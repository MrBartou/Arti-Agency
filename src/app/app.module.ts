import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { MenuComponent } from './shared/menu/menu.component';
import { TeamComponent } from './team/team.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './dashboard/home/home.component';
import { PoleDevWebComponent } from './pole-dev-web/pole-dev-web.component';
import {NgOptimizedImage} from "@angular/common";
import { ProjectComponent } from './dashboard/project/project.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AcceuilComponent,
    TeamComponent,
    ProfileComponent,
    LoaderComponent,
    HomeComponent,
    MenuComponent,
    PoleDevWebComponent,
    ProjectComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        NgOptimizedImage,
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
