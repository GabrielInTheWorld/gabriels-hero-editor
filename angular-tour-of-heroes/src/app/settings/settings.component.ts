// External imports
import { Component, OnInit } from '@angular/core';

/**
 * Componentdecorator
 */
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  /**
   * Constructor
   */
  constructor() { }

  /**
   * Init-function
   */
  ngOnInit() {
  }

  /**
   * Function to change the theme.
   * @param theme This is the new class of the theme
   */
  onThemeChange(theme: string): void {
    const rootElement = document.getElementsByTagName('body')[0];
    const themesToRemove = Array.from(rootElement.classList).filter((item: string) => item.includes('-theme'));
    if (themesToRemove.length) {
      rootElement.classList.remove(...themesToRemove);
    }
    rootElement.classList.add(theme);
  }

}
