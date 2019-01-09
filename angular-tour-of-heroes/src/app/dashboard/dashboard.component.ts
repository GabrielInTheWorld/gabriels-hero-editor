// external imports
import { Component, OnInit } from '@angular/core';

// internal components
import {Hero} from '../hero';

// internal services
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    // get the related heroes for the dashboard
    this.getHeroes();
  }

  /**
   * calls asynchronous task from HeroService to fetch the heroes-array.
   */
  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

}
