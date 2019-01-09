// external imports
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// internal components
import {Hero} from './hero';

// internal services
import { WebsocketService } from './websocket.service';
import { SERVER_URL } from '../environments/environment';

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
   * URL of the server
   */
  SERVER_URL = SERVER_URL.server;

  /**
   * Options for requests to the server except GETs
   */
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  /**
   * Private classmember for the websocket-connection.
   * Will be initialized in the constructor.
   */
  private websocketConnection = null;

  /**
   * constructor
   * @param websocketService Public member
   */
  constructor(
    private websocketService: WebsocketService,
    private http: HttpClient
    ) {
      this.websocketConnection = websocketService.connect();
    }

  /**
   * Asynchronous function to fetch one hero according to passed id.
   * @param id is the id of the hero looked for.
   */
  getHero(id: number): Observable<Object> {
    return this.http.get(this.SERVER_URL + '/heroes/' + id)
      .pipe(this.parse());
  }

  /**
   * A function to send a request to the server to create a new hero with given name.
   * @param name This is the name for the new hero.
   */
  createHero(name: string): Observable<Hero> {
    return this.http.post<Hero>(this.SERVER_URL + '/create', {'name': name}, this.httpOptions).pipe(this.parse());
  }

  /**
   * Function to send a request to the server with id and new name of the hero.
   * @param id The id of the hero, which is updated.
   * @param name The new name of the hero.
   */
  updateHero(id: number, name: string): Observable<Hero> {
    return this.http.put<Hero>(this.SERVER_URL + '/update', {'id': id, 'name': name}, this.httpOptions).pipe(this.parse());
  }

  /**
   * Function to send a request to the server to delete a hero with given id.
   * @param id The id of the hero which should be deleted.
   */
  deleteHero(id: number): Observable<{}> {
    return this.http.delete(this.SERVER_URL + '/delete/' + id, this.httpOptions)
      .pipe(this.parse());
  }

  /**
   * Asynchronous function to fetch all heroes available.
   */
  getHeroes(): Observable<Hero[]> {
    return this.http.get(this.SERVER_URL + '/heroes')
    .pipe(this.parse());
  }

  /**
   * Helper-function to parse the response from a http-call to the server,
   * if the server returns readable data, this will be returned,
   * otherwise it returns nothing and show an error.
   */
  parse(): any {
    return map(data => {
      if (data['data'] === '200') {
        return data['message'];
      } else {
        this.handleError(null, data['message']);
        return null;
      }
    });
  }

  /**
   * Public method to return the connection to the websocket.
   * Necessary, because this connection should only be initialized once
   * and every component needs this connection only if it need information about heroes.
   */
  getWebsocket(): Observable<Object> {
    return this.websocketConnection.pipe(map(response => JSON.parse(response['data'])));
  }

  /**
   * Helper-function to handle errors.
   * @param type The type of the error - necessary to see, when the error occurred.
   * @param object This is the message the server returned.
   */
  private handleError(type: string, object: Object): void {
    console.log('Error: ', type, object);
  }
}
