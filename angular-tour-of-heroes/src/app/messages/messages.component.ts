// external imports
import { Component, OnInit } from '@angular/core';

// internal services
import {MessageService} from '../message.service';

/**
 * Necessary templates and the selector
 */
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})

/**
 * class MessagesComponent
 */
export class MessagesComponent implements OnInit {

  /**
   * constructor
   * @param messageService injects the MessageService as public member to provide the service for the relating html-component.
   */
  constructor(public messageService: MessageService) { }

  /**
   * init-function
   */
  ngOnInit() {
  }

}
