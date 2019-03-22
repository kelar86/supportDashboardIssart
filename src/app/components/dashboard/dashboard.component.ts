import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="main-container">
    <div class="panel">
      incoming
    </div>
    <div class="main">
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </div>
 
</div>
  `,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
