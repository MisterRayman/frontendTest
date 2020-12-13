import {Component, OnDestroy, OnInit} from '@angular/core';
import {Planet} from '../../models/Planet';
import {SwService} from '../../services/sw/sw.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ApiWrapper} from '../../models/ApiWrapper';
import {HelperService} from '../../services/helper/helper.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit, OnDestroy {

  constructor(private sws: SwService,
              private route: ActivatedRoute,
              private router: Router,
              private helper: HelperService,
              private modalService: NgbModal) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initPlanets();
      }
    });
  }

  planets: Planet[] = [];
  pageNumber = 1;
  disablePrevious = false;
  disableNext = true;

  navigationSubscription;

  ngOnInit(): void {
    this.initPlanets();
  }

  nextPage(): void {
    this.router.navigate(['/planets', this.pageNumber + 1]);
  }

  previousPage(): void {
    this.router.navigate(['/planets', this.pageNumber - 1]);
  }

  showPlanetDetail(planet: Planet): void {
    const planetId = this.helper.getResourceIdFromURL(planet.url);
    this.router.navigate(['/planet', planetId]);
  }

  private initPlanets(): void {
    this.route.params.subscribe(param => this.pageNumber = +param.id);
    const wrapperObservable = this.sws.getPlanets(this.pageNumber);
    this.sws.mapToPlanets(wrapperObservable).subscribe(value => this.planets = value);
    wrapperObservable.subscribe(value => {
      this.setPaginatorBools(value);
    });
  }

  private setPaginatorBools(value: ApiWrapper): void {
    if (value.next == null) {
      this.disableNext = true;
    } else {
      this.disableNext = false;
    }
    if (value.previous == null) {
      this.disablePrevious = true;
    } else {
      this.disablePrevious = false;
    }
  }

  open(content): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      // Work with result
    );
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}
