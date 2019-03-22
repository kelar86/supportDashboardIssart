import { Component, OnInit, OnDestroy } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { StorageService } from 'src/app/storage.service';



@Component({
  selector: 'app-dashboard',
  template: `
    <div class="main-container">
    
    <header id="header">
      <h3>Support Dashboard</h3>
    </header>
    <div id="incoming" class="message-container">
    <h4>Incoming messages</h4>
        <mat-list role="list"
          cdkDropList
          #incomingTable="cdkDropList"
          [cdkDropListData]="incoming"
          [cdkDropListConnectedTo]="[supportTable, incomingTable, marketingTable, ceoTable]"
          class="message-list"
          (cdkDropListDropped)="drop($event)">

            <mat-list-item class="message-box" *ngIf="incoming.length === 0">
              <span>There is no incoming messages...</span>
            </mat-list-item>

            <mat-list-item class="message-box" *ngFor="let item of incoming" cdkDrag>
              <span class="message-box__span" matLine> Summary: {{item.summary}} </span>
              <span class="message-box__span" matLine> From: {{item.email}} </span>
              <span class="message-box__span" matLine> Date: {{item.date | date:'dd-MM-yyyy'}}</span>
            </mat-list-item>
          </mat-list>

    </div>


      <div id="support" class="message-container">
        <h4>Tecnical support</h4>
          <mat-list
            cdkDropList
            #supportTable="cdkDropList"
            [cdkDropListData]="support"
            [cdkDropListConnectedTo]="[supportTable, incomingTable, marketingTable, ceoTable]"
            class="message-list"
            (cdkDropListDropped)="drop($event)">

            <mat-list-item class="message-box" *ngIf="support.length === 0">
              <span>Drop message here...</span>
            </mat-list-item>
            <mat-list-item class="message-box" *ngFor="let item of support" cdkDrag>
                <span class="message-box__span" matLine> Summary: {{item.summary}} </span>
                <span class="message-box__span" matLine> From: {{item.email}} </span>
                <span class="message-box__span" matLine> Date: {{item.date | date:'dd-MM-yyyy'}}</span>
              </mat-list-item>
          </mat-list>
          
    </div>
    
    <div id="marketing" class="message-container">
    <h4>Marketing</h4>
      <mat-list
        cdkDropList
        #marketingTable="cdkDropList"
        [cdkDropListData]="marketing"
        [cdkDropListConnectedTo]="[supportTable, incomingTable, marketingTable, ceoTable]"
        class="message-list"
        (cdkDropListDropped)="drop($event)">

        <mat-list-item class="message-box" *ngIf="marketing.length === 0">
          <span>Drop message here...</span>
        </mat-list-item>
        <mat-list-item class="message-box" *ngFor="let item of marketing" cdkDrag>
              <span class="message-box__span" matLine> Summary: {{item.summary}} </span>
              <span class="message-box__span" matLine> From: {{item.email}} </span>
              <span class="message-box__span" matLine> Date: {{item.date | date:'dd-MM-yyyy'}}</span>
          </mat-list-item>
        </mat-list>
      
    </div>
    <div id="ceo" class="message-container">
    <h4>CEO</h4>
      <mat-list
        cdkDropList
        #ceoTable="cdkDropList"
        [cdkDropListData]="ceo"
        [cdkDropListConnectedTo]="[supportTable, incomingTable, marketingTable, ceoTable]"
        class="message-list"
        (cdkDropListDropped)="drop($event)">
        
        <mat-list-item class="message-box" *ngIf="ceo.length === 0">
          <span>Drop message here...</span>
        </mat-list-item>
        <mat-list-item class="message-box" *ngFor="let item of ceo" cdkDrag>
              <span class="message-box__span" matLine> Summary: {{item.summary}} </span>
              <span class="message-box__span" matLine> From: {{item.email}} </span>
              <span class="message-box__span" matLine> Date: {{item.date | date:'dd-MM-yyyy'}}</span>
          </mat-list-item>
        </mat-list>
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
    console.log(event);
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
