import { Component, OnInit, OnDestroy } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { StorageService } from 'src/app/storage.service';



@Component({
  selector: 'app-dashboard',
  template: `
    <div class="main-container">

    <div class="panel">
    <h4>Incoming messages</h4>
      <table>
        <thead>
          <th></th>
        </thead>
        <div
          cdkDropList
          #incomingTable="cdkDropList"
          [cdkDropListData]="incoming"
          [cdkDropListConnectedTo]="[supportTable, incomingTable, marketingTable, ceoTable]"
          class="message-list"
          (cdkDropListDropped)="drop($event)">
          <div class="message-box" *ngFor="let item of incoming" cdkDrag> {{item.summary}} | {{item.email}} | {{item.date}}</div>
      </div>

      </table>
    </div>

    <div class="main">
      <div>
      <h4>Tecnical support</h4>
        <div
          cdkDropList
          #supportTable="cdkDropList"
          [cdkDropListData]="support"
          [cdkDropListConnectedTo]="[supportTable, incomingTable, marketingTable, ceoTable]"
          class="message-list"
          (cdkDropListDropped)="drop($event)">

          <div class="message-box" *ngFor="let item of support" cdkDrag> {{item.summary}} | {{item.email}} | {{item.date}}</div>
      </div>
    </div>
    <div>
    <h4>Marketing</h4>

      <div
        cdkDropList
        #marketingTable="cdkDropList"
        [cdkDropListData]="marketing"
        [cdkDropListConnectedTo]="[supportTable, incomingTable, marketingTable, ceoTable]"
        class="message-list"
        (cdkDropListDropped)="drop($event)">

        <div class="message-box" *ngFor="let item of marketing" cdkDrag> {{item.summary}} | {{item.email}} | {{item.date}}</div>
      </div>
    </div>
    <div>
    <h4>CEO</h4>
      <div
        cdkDropList
        #ceoTable="cdkDropList"
        [cdkDropListData]="ceo"
        [cdkDropListConnectedTo]="[supportTable, incomingTable, marketingTable, ceoTable]"
        class="message-list"
        (cdkDropListDropped)="drop($event)">
        <div class="message-box" *ngFor="let item of ceo" cdkDrag> {{item.summary}} |  {{item.email}} | {{item.date}}</div>
      </div>
    </div>
    </div>

</div>
  `,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  subscribtions;

  incoming = [];
  support = [];
  marketing = [];
  ceo = [];

  constructor(private storage: StorageService) {
    this.subscribtions = [
      this.storage.incoming.subscribe(v => this.incoming = v),
      this.storage.support.subscribe(v => this.support = v),
      this.storage.marketing.subscribe(v => this.marketing = v),
      this.storage.ceo.subscribe(v => this.ceo = v),
    ];

    this.storage.init();
   }

  ngOnInit() {


  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);

      this.storage.update({
        incoming: this.incoming,
        support: this.support,
        marketing: this.marketing,
        ceo: this.ceo
      });
    }
  }


  ngOnDestroy() {
    this.subscribtions.map(item => item.unsubscribe());
  }
}
