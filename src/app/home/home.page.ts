import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventsService } from '../events.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  events: EventResponse[] = [];
  sub: Subscription;

  constructor(private eventService: EventsService,
    private nav: NavController) {

  }
  ngOnInit(): void {
    this.sub = this.eventService.getAll()
      .subscribe(e => this.events.push(e));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getEvents(): EventResponse[] {
    return this.events.sort( (a,b) => a.event.created > b.event.created ? -1 : 1 );
  }

  details(reponse: EventResponse) {
    this.nav.navigateForward(`/details/${reponse.event.id}`);
  }
}
