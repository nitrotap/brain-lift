import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  goSignup() {
    this.router.navigateByUrl('/signup');
  }
  constructor(private router: Router) { }

}
