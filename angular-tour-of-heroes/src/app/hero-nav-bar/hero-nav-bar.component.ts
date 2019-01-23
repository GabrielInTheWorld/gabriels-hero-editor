// External imports
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Internal imports
import { routes } from '../../environments/routes';
import { Route } from '../route';

/**
 * Componentdecorator
 */
@Component({
  selector: 'app-hero-nav-bar',
  templateUrl: './hero-nav-bar.component.html',
  styleUrls: ['./hero-nav-bar.component.scss']
})
export class HeroNavBarComponent {

  /**
   * The routes for the navigation-drawer.
   */
  iRoutes: Route[] = routes;

  /**
   * Recognize if the screen is very small (< 599px)
   */
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  /**
   * Constructor
   * @param breakpointObserver The observer to recognize changes in the layout/screenresolution.
   */
  constructor(private breakpointObserver: BreakpointObserver) {}

}
