// external imports
import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

// internal components
import {Hero} from '../hero';

// internal services
import {HeroService} from '../hero.service';

/**
 * Necessary templates and the selector
 */
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  /**
   * Changeable classmember.
   * Relates to the input-element in the related component.
   */
  @Input() hero: Hero;

  /**
   * constructor
   * @param location get the app's Location to go back.
   * @param activeRoute hold the ActivatedRoute to get the param from URL.
   * @param heroService injects the HeroService to fetch a specific hero.
   */
  constructor(
    private location: Location,
    private activeRoute: ActivatedRoute,
    private heroService: HeroService
  ) { }

  /**
   * init-function
   */
  ngOnInit() {
    this.getHero();
  }

  /**
   * Get id from URL.
   * Fetch the hero according to the id.
   */
  getHero(): void {
    const id = +this.activeRoute.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
    .subscribe(hero => this.hero = hero);
  }

  /**
   * Go back to the last location.
   */
  goBack(): void {
    this.location.back();
  }

}
