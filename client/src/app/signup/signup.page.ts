import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  email: any;
  password: any;
  errorMessage: any;


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

  ngOnInit() {
  }

}
