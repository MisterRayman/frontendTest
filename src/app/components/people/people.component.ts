import {Component, OnDestroy, OnInit} from '@angular/core';
import {SwService} from '../../services/sw/sw.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {People} from '../../models/People';
import {ApiWrapper} from '../../models/ApiWrapper';
import {HelperService} from '../../services/helper/helper.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit, OnDestroy {
  navigationSubscription;

  people: People[] = [];
  pageNumber = 1;
  disablePrevious = false;
  disableNext = true;

  constructor(private sws: SwService,
              private route: ActivatedRoute,
              private router: Router,
              private helper: HelperService,
              private modalService: NgbModal) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initPeople();
      }
    });
  }

  ngOnInit(): void {
    this.initPeople();
  }

  private initPeople(): void {
    this.route.params.subscribe(param => this.pageNumber = +param.id);
    const wrapperObservable = this.sws.getPeople(this.pageNumber);
    this.sws.mapToPeople(wrapperObservable).subscribe(value => this.people = value);
    wrapperObservable.subscribe(value => {
      this.setPaginatorBools(value);
    });

  }

  showPeopleDetail(person: People): void {
    const personId = this.helper.getResourceIdFromURL(person.url);
    this.router.navigate(['/person', personId]);
  }

  nextPage(): void {
    this.router.navigate(['/people', this.pageNumber + 1]);
  }

  previousPage(): void {
    this.router.navigate(['/people', this.pageNumber - 1]);
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
