// external imports
import { Injectable } from '@angular/core';

/**
 * Injectable service
 */
@Injectable({
  providedIn: 'root'
})
/**
 * class MessageService
 */
export class MessageService {

  /**
   * classmember to store all incoming messages until they will be cleared.
   */
  messages: string[] = [];

  /**
   * Function to add a message to the existing list of messages.
   * @param message is the message that will be added.
   */
  add(message: string) {
    this.messages.push(message);
  }

  /**
   * Function to clear all messages
   */
  clear() {
    this.messages = [];
  }
}
