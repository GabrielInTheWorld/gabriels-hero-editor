// external imports
import { Component } from '@angular/core';

/**
 * Necessary templates and the selector
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

/**
 * Exports the class AppComponent.
 */
export class AppComponent {
  /**
   * Classmember title which contains the title of the app.
   */
  title = 'Tour of Heroes';
}
