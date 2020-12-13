import {Injectable} from '@angular/core';
import {People} from '../../models/People';
import {Planet} from '../../models/Planet';
import {Router} from '@angular/router';
import {Film} from '../../models/Film';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private router: Router) {
  }

  /**
   * Get the resourceId from a url as a number
   * e.g. https://swapi.dev/api/films/6/ => 6
   * @param url URL
   *
   */
  getResourceIdFromURL(url: string): number {
    return parseInt(url.split('/').filter(ele => Number.isInteger(parseInt(ele, 10)))[0], 10);
  }

  /**
   * Go to /person/<id>
   * @param person selectedPerson
   */
  gotoPerson(person: People): void {
    const id = this.getResourceIdFromURL(person.url);
    this.router.navigate(['/person', id]);
  }

  /**
   * Go to /planet/<id>
   * @param planet selectedPlanet
   */
  gotoPlanet(planet: Planet): void {
    const id = this.getResourceIdFromURL(planet.url);
    this.router.navigate(['/planet', id]);
  }

  /**
   * Go to /film/<id>
   * @param film selectedFilm
   */
  gotoFilm(film: Film): void {
    const id = this.getResourceIdFromURL(film.url);
    this.router.navigate(['/film', id]);
  }
}
