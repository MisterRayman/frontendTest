import {Component, OnInit} from '@angular/core';
import {Film} from '../../models/Film';
import {Planet} from '../../models/Planet';
import {People} from '../../models/People';
import {Starship} from '../../models/Starship';
import {Vehicle} from '../../models/Vehicle';
import {SwService} from '../../services/sw/sw.service';
import {ActivatedRoute} from '@angular/router';
import {HelperService} from '../../services/helper/helper.service';

@Component({
  selector: 'app-people-detail',
  templateUrl: './people-detail.component.html',
  styleUrls: ['./people-detail.component.scss']
})
export class PeopleDetailComponent implements OnInit {
  personId = 0;
  person?: People;
  homeworld?: Planet;
  films: Film[] = [];
  starships: Starship[] = [];
  vehicles: Vehicle[] = [];

  constructor(private sws: SwService,
              private route: ActivatedRoute,
              private helper: HelperService) {
  }

  ngOnInit(): void {
    this.initPerson();
  }

  private initPerson(): void {
    this.route.params.subscribe(param => this.personId = +param.id);
    this.sws.getPerson(this.personId).subscribe(value => {
      this.person = value;
      this.initHomeword(value);
      this.initFilms(value);
      this.initStarships(value);
      this.initVehicles(value);
    });
  }

  private initFilms(person: People): void {
    person.films.forEach(ship => {
      const id = this.helper.getResourceIdFromURL(ship);
      this.sws.getFilm(id).subscribe(value => this.films.push(value));
    });
  }

  private initStarships(person: People): void {
    person.starships.forEach(ship => {
      const id = this.helper.getResourceIdFromURL(ship);
      this.sws.getStarship(id).subscribe(value => this.starships.push(value));
    });
  }

  private initVehicles(person: People): void {
    person.vehicles.forEach(vehicle => {
      const id = this.helper.getResourceIdFromURL(vehicle);
      this.sws.getVehicle(id).subscribe(value => this.vehicles.push(value));
    });
  }

  private initHomeword(person: People): void {
    const id = this.helper.getResourceIdFromURL(person.homeworld);
    this.sws.getPlanet(id).subscribe(value => this.homeworld = value);
  }
}
