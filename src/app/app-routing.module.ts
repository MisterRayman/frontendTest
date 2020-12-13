import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FilmsComponent} from './components/films/films.component';
import {PlanetsComponent} from './components/planets/planets.component';
import {PeopleComponent} from './components/people/people.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {HomeComponent} from './components/home/home.component';
import {PlanetDetailComponent} from './components/planet-detail/planet-detail.component';
import {FilmDetailComponent} from './components/film-detail/film-detail.component';
import {PeopleDetailComponent} from './components/people-detail/people-detail.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'films', component: FilmsComponent},
  {path: 'film/:id', component: FilmDetailComponent},
  {path: 'people/:id', component: PeopleComponent, runGuardsAndResolvers: 'always'},
  {path: 'person/:id', component: PeopleDetailComponent},
  {path: 'planets/:id', component: PlanetsComponent, runGuardsAndResolvers: 'always'},
  {path: 'planet/:id', component: PlanetDetailComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
