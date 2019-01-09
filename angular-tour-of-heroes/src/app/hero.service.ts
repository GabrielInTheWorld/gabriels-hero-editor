// external imports
import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

// internal components
import {Hero} from './hero';

// internal services
import {MessageService} from './message.service';

// mock-data
import {HEROES} from './mock-heroes';

/**
 * Injectable
 */
@Injectable({
  providedIn: 'root'
})

/**
 * class HeroService
 */
export class HeroService {

  /**
   * constructor
   * @param messageService injects the MessageService as private member to add messages after fetching heroes.
   */
  constructor(private messageService: MessageService) { }

  /**
   * Asynchronous function to fetch one hero according to passed id.
   * @param id is the id of the hero looked for.
   */
  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

  /**
   * Asynchronous function to fetch all heroes available.
   */
  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes.');
    return of(HEROES);
  }
}
