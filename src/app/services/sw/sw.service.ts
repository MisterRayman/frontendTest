import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiWrapper} from '../../models/ApiWrapper';
import {Film} from '../../models/Film';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Planet} from '../../models/Planet';
import {People} from '../../models/People';
import {Starship} from '../../models/Starship';
import {Vehicle} from '../../models/Vehicle';

const baseURL = 'https://swapi.dev/api';

@Injectable({
  providedIn: 'root'
})
export class SwService {


  constructor(private http: HttpClient) {
  }

  /**
   * Map ApiWrapper.results to Planet[]
   * @param apiWrapper Observeable
   */
  mapToPlanets(apiWrapper: Observable<ApiWrapper>): Observable<Planet[]> {
    return apiWrapper.pipe(
      map(value => value.results as Planet[])
    );
  }

  /**
   *  Get all Planets from https://swapi.dev/api/planets as Wrapper
   * @param pagenr Pagenumber
   */
  getPlanets(pagenr: number): Observable<ApiWrapper> {
    return this.http.get<ApiWrapper>(baseURL + '/planets/?page=' + pagenr);
  }

  /**
   * Get Planet by Id from https://swapi.dev/api/planets/<id>
   * @param planetId ID
   */
  getPlanet(planetId: number): Observable<Planet> {
    return this.http.get<Planet>(baseURL + '/planets/' + planetId);
  }

  /**
   * Get People by Id from https://swapi.dev/api/people/<id>
   * @param personId ID
   */
  getPerson(personId: number): Observable<People> {
    return this.http.get<People>(baseURL + '/people/' + personId);
  }

  /**
   * Get People by Id from https://swapi.dev/api/film/<id>
   * @param filmId ID
   */
  getFilm(filmId: number): Observable<Film> {
    return this.http.get<Film>(baseURL + '/films/' + filmId);
  }

  /**
   * Get Starship by Id from https://swapi.dev/api/starships/<id>
   * @param starshipId ID
   */
  getStarship(starshipId: number): Observable<Starship> {
    return this.http.get<Starship>(baseURL + '/starships/' + starshipId);
  }

  /**
   * Get Starship by Id from https://swapi.dev/api/vehicles/<id>
   * @param vehicleId ID
   */
  getVehicle(vehicleId: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(baseURL + '/vehicles/' + vehicleId);
  }

  /**
   * Map ApiWrapper.results to People[]
   * @param apiWrapper Observeable
   */
  mapToPeople(apiWrapper: Observable<ApiWrapper>): Observable<People[]> {
    return apiWrapper.pipe(
      map(value => value.results as People[])
    );
  }

  /**
   * Get all Planets from https://swapi.dev/api/planets as Wrapper
   * * @param pagenr Pagenumber
   */
  getPeople(pagenr: number): Observable<ApiWrapper> {
    return this.http.get<ApiWrapper>(baseURL + '/people/?page=' + pagenr);
  }

  /**
   * Map ApiWrapper.results to Film[]
   */
  mapToFilms(): Observable<Film[]> {
    return this.getFilms().pipe(
      map(value => value.results as Film[])
    );
  }

  /**
   * Get all Films from https://swapi.dev/api/films as Wrapper
   */
  getFilms(): Observable<ApiWrapper> {
    return this.http.get<ApiWrapper>(baseURL + '/films');
  }

  getSearch(search: string): Observable<ApiWrapper> {

    return this.http.get<ApiWrapper>(baseURL + '/films');
  }
}
