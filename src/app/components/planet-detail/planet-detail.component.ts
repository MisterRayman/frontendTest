import {Component, OnInit} from '@angular/core';
import {SwService} from '../../services/sw/sw.service';
import {ActivatedRoute} from '@angular/router';
import {Planet} from '../../models/Planet';
import {Film} from '../../models/Film';
import {People} from '../../models/People';
import {Starship} from '../../models/Starship';
import {Vehicle} from '../../models/Vehicle';
import {HelperService} from '../../services/helper/helper.service';

@Component({
  selector: 'app-planet-detail',
  templateUrl: './planet-detail.component.html',
  styleUrls: ['./planet-detail.component.scss']
})
export class PlanetDetailComponent implements OnInit {
  planetId = 0;
  planet?: Planet;
  films: Film[] = [];
  people: People[] = [];
  starships: Starship[] = [];
  vehicles: Vehicle[] = [];

  constructor(private sws: SwService,
              private route: ActivatedRoute,
              private helper: HelperService) {
  }

  ngOnInit(): void {
    this.initPlanet();
  }

  private initPlanet(): void {
    this.route.params.subscribe(param => this.planetId = +param.id);
    this.sws.getPlanet(this.planetId).subscribe(value => {
      this.planet = value;
      this.initFilms(value);
      this.initPeople(value);
    });
  }

  private initFilms(planet: Planet): void {
    planet?.films.forEach(film => {
      const filmId = this.helper.getResourceIdFromURL(film);
      this.sws.getFilm(filmId).subscribe(value => this.films.push(value));
    });
  }

  private initPeople(planet: Planet): void {
    planet?.residents.forEach(people => {
      const charId = this.helper.getResourceIdFromURL(people);
      this.sws.getPerson(charId).subscribe(value => this.people.push(value));
    });
  }
}
