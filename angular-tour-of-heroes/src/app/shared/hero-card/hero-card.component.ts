import { Component, Input } from '@angular/core';

/**
 * Componentdecorator
 */
@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent {

  /**
   * This is a string which will be displayed as title.
   */
  @Input() title: string;

  /**
   * The subtitle for the card.
   */
  @Input() subTitle: string;

  /**
   * Boolean which decides if a content will be displayed.
   */
  @Input() hasContent: boolean;

  /**
   * Boolean which decides if there actions that should be displayed.
   */
  @Input() hasActions: boolean;

}
