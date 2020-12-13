import {Component, OnInit} from '@angular/core';
import {SwService} from '../../services/sw/sw.service';
import {Film} from '../../models/Film';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {

  constructor(private sws: SwService,
              private router: Router,
              private modalService: NgbModal) {
  }

  films: Film[] = [];

  ngOnInit(): void {
    this.initFilms();
  }

  private initFilms(): void {
    this.sws.mapToFilms().subscribe(value => this.films = value);
  }

  showFilmDetail(film: Film): void {
    const filmId = film.url.split('/').filter(ele => Number.isInteger(parseInt(ele, 10)))[0];
    this.router.navigate(['/film', filmId]);
  }

  open(content): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      // Work with result
    );
  }
}
