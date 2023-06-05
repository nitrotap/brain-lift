import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-education',
  templateUrl: './education.page.html',
  styleUrls: ['./education.page.scss'],
})
export class EducationPage implements OnInit {

  constructor(private router: Router) { }

  goToStrategies() {
    this.router.navigateByUrl('/strategies')
  }

  goToMeasure() {
    this.router.navigateByUrl('/measure')
  }

  ngOnInit() {
  }

}
