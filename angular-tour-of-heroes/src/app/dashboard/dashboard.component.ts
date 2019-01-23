// external imports
import { Component, OnInit } from '@angular/core';

// internal components
import {Hero} from '../hero';

// internal services
import {HeroService} from '../hero.service';

/**
 * Necessary templates and the selector
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

/**
 * class DashboardComponent
 */
export class DashboardComponent implements OnInit {

  /**
   * Classmember to store the first four heroes
   * and display them in the dashboard.
   */
  heroes: Hero[] = [];

  /**
   * constructor
   * @param heroService injects the HeroService to fetch the heroes from database.
   */
  constructor(private heroService: HeroService) { }

  /**
   * init-function
   */
  ngOnInit() {
    // get the related heroes for the dashboard
    this.getHeroes();
    this.onWatch();
  }

  /**
   * calls asynchronous task from HeroService to fetch the heroes-array.
   */
  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  /**
   * Private function to subscribe to the websocket-connection from hero-service.
   * If the server sends an update, this component will read information from server once again.
   */
  private onWatch(): void {
    this.heroService.getWebsocket()
    .subscribe(event => {
      if (event['type'] === 'update') {
        this.getHeroes();
      }
    });
  }

}
