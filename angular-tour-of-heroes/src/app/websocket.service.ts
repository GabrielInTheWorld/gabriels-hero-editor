// External imports
import { Injectable } from '@angular/core';
import * as RX from 'rxjs';

// Internal imports
import { SERVER_URL } from '../environments/environment';

/**
 * Injectable-parameters
 */
@Injectable({
  providedIn: 'root'
})
/**
 * Service for the websocket-connection.
 * Creates and holds a connection to the server.
 */
export class WebsocketService {

  /**
   * URL for the websocket-API
   * Gets this from the server-constants
   */
  private WS_URL = SERVER_URL.websocket;

  /**
   * The observable object which will be created from the 'onmessage'-event from the websocket.
   * This is necessary to 'hear', if new messages are incoming.
   */
  private observer: RX.Observable<Object>;

  /**
   * Initialize the connection.
   * If the observer is not already initialized and the connection to the server established,
   * then create a new observer.
   */
  public connect(): RX.Observable<Object> {
    if (!this.observer) {
      this.observer = this.create(this.WS_URL);
    }
    return this.observer;
  }

  /**
   * Creates the observer.
   * Starts with creating a new websocket-connection
   * and creates a new observable object from the 'onmessage'-event from websockets.
   * @param url This is the URL for the websocket-API, the observable should be listening to.
   */
  private create(url: string): RX.Observable<Object> {
    const ws = new WebSocket(url);
    const observer = RX.fromEvent(ws, 'message');
    return observer;
  }
}
