import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, ActivationEnd} from '@angular/router';
import {Location} from '@angular/common';

// custom components
import {Hero} from '../hero';

// custom services
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  constructor(
    private location: Location,
    private activeRoute: ActivatedRoute,
    private heroService: HeroService
  ) { }

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    const id = +this.activeRoute.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
    .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

}
