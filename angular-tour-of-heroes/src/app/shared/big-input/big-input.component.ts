// External imports
import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Componentdecorator
 */
@Component({
  selector: 'app-big-input',
  templateUrl: './big-input.component.html',
  styleUrls: ['./big-input.component.scss']
})
export class BigInputComponent {

  /**
   * The current value of the input.
   */
  @Input() value: string;

  /**
   * The label for the input - if no set, there is no label.
   */
  @Input() label: string;

  /**
   * The placeholder for the input - this is displayed if there is no input.
   */
  @Input() placeholder: string;

  /**
   * The EventEmitter to pass the ChangeEvent through to the parentcomponent.
   */
  @Output() changed = new EventEmitter<string>();

  /**
   * The function for the local ChangeEvent that will be emitted.
   * @param message Is the new input of the element.
   */
  onChange(message: string): void {
    this.changed.emit(message);
  }
}
