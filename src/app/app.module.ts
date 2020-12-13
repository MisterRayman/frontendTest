import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import localeDe from '@angular/common/locales/de';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import {FilmsComponent} from './components/films/films.component';
import {PeopleComponent} from './components/people/people.component';
import {PlanetsComponent} from './components/planets/planets.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {registerLocaleData} from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { PlanetDetailComponent } from './components/planet-detail/planet-detail.component';
import {UnitPipe} from './models/UnitPipe';
import { FilmDetailComponent } from './components/film-detail/film-detail.component';
import { PeopleDetailComponent } from './components/people-detail/people-detail.component';
import {NgbInputDatepicker, NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FilmsComponent,
    PeopleComponent,
    PlanetsComponent,
    NotFoundComponent,
    HomeComponent,
    PlanetDetailComponent,
    UnitPipe,
    FilmDetailComponent,
    PeopleDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'de'}],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localeDe);
  }
}
