import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-strategies',
  templateUrl: './strategies.page.html',
  styleUrls: ['./strategies.page.scss'],
})
export class StrategiesPage implements OnInit {
  segmentValue: string;
  segmentValue2: string;

  constructor() {
    this.segmentValue = 'first';  // You can set it to be whatever you like, or even leave it undefined.
    this.segmentValue2 = 'fourth'
  }

  ngOnInit() {
  }

}
