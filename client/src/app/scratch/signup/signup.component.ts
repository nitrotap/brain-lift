import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {

  constructor(private router: Router) { }

  signup() {
    if (this.email && this.password) {
      // You can implement your own signup logic here
      // For simplicity, we'll just navigate to the login page
      this.router.navigateByUrl('/login');
    } else {
      this.errorMessage = 'Please enter an email and password.';
    }
  }
}
