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
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})
export class FilmDetailComponent implements OnInit {
  filmId = 0;
  film?: Film;
  planets: Planet[] = [];
  people: People[] = [];
  starships: Starship[] = [];
  vehicles: Vehicle[] = [];

  constructor(private sws: SwService,
              private route: ActivatedRoute,
              private helper: HelperService) {
  }

  ngOnInit(): void {
    this.initFilm();
  }


  private initFilm(): void {
    this.route.params.subscribe(param => this.filmId = +param.id);
    this.sws.getFilm(this.filmId).subscribe(value => {
      this.film = value;
      this.initPlanets(value);
      this.initPeople(value);
      this.initStarships(value);
      this.initVehicles(value);
    });
  }


  private initPlanets(film: Film): void {
    film?.planets.forEach(planet => {
      const id = this.helper.getResourceIdFromURL(planet);
      this.sws.getPlanet(id).subscribe(value => this.planets.push(value));
    });
  }

  private initPeople(film: Film): void {
    film?.characters.forEach(char => {
      const id = this.helper.getResourceIdFromURL(char);
      this.sws.getPerson(id).subscribe(value => this.people.push(value));
    });
  }

  private initStarships(film: Film): void {
    film?.starships.forEach(ship => {
      const id = this.helper.getResourceIdFromURL(ship);
      this.sws.getStarship(id).subscribe(value => this.starships.push(value));
    });
  }

  private initVehicles(film: Film): void {
    film?.vehicles.forEach(vehicle => {
      const id = this.helper.getResourceIdFromURL(vehicle);
      this.sws.getVehicle(id).subscribe(value => this.vehicles.push(value));
    });
  }
}
