// external imports
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

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
   * Boolean to check if a new hero is creating.
   * Is so, show a button to submit this new entry,
   * otherwise the button won't be shown.
   */
  isCreating = false;

  /**
   * constructor
   * @param location get the app's Location to go back.
   * @param activeRoute hold the ActivatedRoute to get the param from URL.
   * @param heroService injects the HeroService to fetch a specific hero.
   */
  constructor(
    private router: Router,
    private location: Location,
    private activeRoute: ActivatedRoute,
    private heroService: HeroService
  ) { }

  /**
   * init-function
   */
  ngOnInit() {
    this.getHero();
    this.onWatch();
  }

  /**
   * Get id from URL.
   * Fetch the hero according to the id.
   */
  getHero(): void {
    const id = +this.activeRoute.snapshot.paramMap.get('id');
    if (id !== -1) {
      this.heroService.getHero(id)
      .subscribe(response => {
        if (response !== null) {
          this.hero = <Hero>response;
        }
      });
    } else {
      this.isCreating = true;
      this.hero = {
        id: id,
        name: ''
      };
    }
  }

  /**
   * This will send via the hero-service
   * a request to the server with given name
   * from this classmember.
   */
  createNewHero(): void {
    this.heroService.createHero(this.hero.name)
    .subscribe(response => {
      if (response !== null) {
        this.router.navigateByUrl('/heroes');
      }
    });
  }

  /**
   * A message to change the name of an existing hero
   * or set the name for a new hero.
   * @param message The message from type string is the new name for the (new) hero.
   */
  onChange(message: string): void {
    if (!this.isCreating) {
      this.heroService.updateHero(this.hero.id, message)
      .subscribe();
    } else {
      this.hero.name = message;
    }
  }

  /**
   * Message to delete the shown hero.
   */
  deleteHero(): void {
    this.heroService.deleteHero(this.hero.id).subscribe(response => {
      if (response !== null) {
        this.router.navigateByUrl('/heroes');
      }
    });
  }

  /**
   * Go back to the last location.
   */
  goBack(): void {
    this.location.back();
  }

  /**
   * Private function to subscribe the websocket-connection.
   * If there are updates, the component will get read information from server again.
   */
  private onWatch(): void {
    this.heroService.getWebsocket().subscribe(event => {
      if (event['type'] === 'update') {
        this.getHero();
      }
    });
  }
}
