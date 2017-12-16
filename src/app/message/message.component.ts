import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MessageType } from '../message-type.enum';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnChanges {

  @Input() message: string;

  @Input() type: MessageType;

  messageClass: {};

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.messageClass = {
      "alert-info": this.type === MessageType.INFO,
      "alert-warning": this.type === MessageType.WARNING,
      "alert-danger": this.type === MessageType.ERROR,
      "alert-success": this.type === MessageType.SUCCESS
    }
  }
}
