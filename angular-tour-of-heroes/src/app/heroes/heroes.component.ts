// external imports
import { Component, OnInit } from '@angular/core';

// internal components
import {Hero} from '../hero';

// internal services
import {HeroService} from '../hero.service';

/**
 * Necessary templates and the selector.
 */
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

/**
 * class HeroesComponent
 * Contains logic for the listview of all available heroes.
 */
export class HeroesComponent implements OnInit {

  /**
   * {Array} to store all fetched heroes from database.
   */
  heroes: Hero[];

  /**
   * constructor
   * @param heroService injects the HeroService as private member to fetch asynchronous hero-data.
   */
  constructor(private heroService: HeroService) { }

  /**
   * init-function
   * Calls the private function getHeroes to load all heroes from service.
   */
  ngOnInit() {
    this.getHeroes();
  }

  /**
   * Calls asynchronous task from service to get all heroes.
   */
  private getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
}
