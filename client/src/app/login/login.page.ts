import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: any;
  password: any;
  errorMessage: any;

  constructor(private router: Router) { }

  login() {
    if (this.email && this.password) {
      // You can implement your own login logic here
      // For simplicity, we'll just navigate to a welcome page
      this.router.navigateByUrl('/home');
    } else {
      this.errorMessage = 'Please enter your email and password.';
    }
  }

  resetPassword() {
    // Implement your reset password logic here
    // This can be a form or a modal to reset the password
    // For simplicity, we'll just navigate to a password reset page
    this.router.navigateByUrl('/reset-password');
  }

  ngOnInit() {
  }

}
