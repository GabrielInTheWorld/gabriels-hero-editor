// external imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatBadgeModule } from '@angular/material';
import { MatCardModule, MatInputModule, MatGridListModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';

// internal components
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BigInputComponent } from './shared/big-input/big-input.component';
import { HeroNavBarComponent } from './hero-nav-bar/hero-nav-bar.component';
import { HeroCardComponent } from './shared/hero-card/hero-card.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    BigInputComponent,
    HeroNavBarComponent,
    HeroCardComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatBadgeModule,
    MatCardModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
