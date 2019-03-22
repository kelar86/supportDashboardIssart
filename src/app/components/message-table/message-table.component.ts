import { Component, OnInit, Input, Output } from '@angular/core';
import { MeassageList } from 'src/app/models/message-list.model';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-message-table',
  template: `
    <p>
      message-table works!
    </p>
  `,
  styles: []
})
export class MessageTableComponent implements OnInit {

  @Input() list: MeassageList;
  @Output() action = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
