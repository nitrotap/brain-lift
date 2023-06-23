import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserDataService} from '../services/user-data.service';
import {ActionSheetController, AlertController, ToastController} from '@ionic/angular';
import jwt_decode, {JwtPayload} from 'jwt-decode'


@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
    email: any;
    password: any;
    errorMessage: any;
    termsChecked: any;


    constructor(private router: Router, private userDataService: UserDataService, private toastController: ToastController) {
    }

    signup(email: string, password: string) {

        const result = this.validateAndSanitizeEmailAndPassword(email, password);

        if (result.isValid) {
            let formData = {
                "email": result.sanitizedEmail,
                "password": result.sanitizedPassword
            }

            this.userDataService.postData(formData).subscribe({
                next: async (response) => {
                    console.log('Response from server:', response)
                    const decodedToken = jwt_decode(response.sessionID) as { [key: string]: any }; // Typecast to allow access to token properties
                    const currentTimestamp = Math.floor(Date.now() / 1000); // Get current timestamp in seconds

                    if (decodedToken['exp'] < currentTimestamp) {
                        // Token has expired
                        console.log('Token has expired');
                    } else {
                        // Token is valid
                        console.log('Token is valid');
                        console.log(decodedToken)
                        // set session variables in client
                        sessionStorage.setItem("sessionID", response.sessionID);
                        sessionStorage.setItem("access", decodedToken['access']);
                        sessionStorage.setItem("userID", decodedToken['userID'])


                        const alert = await this.toastController.create({
                            message: 'Successfully created your account!',
                            duration: 2000,
                            position: 'bottom',
                            color: 'success'
                        });
                        await alert.present();
                        this.router.navigateByUrl('/task');

                    }


                },
                error: async (error) => {
                    console.error('Error:', error)
                    const alert = await this.toastController.create({
                        message: error,
                        duration: 2000,
                        position: 'bottom',
                        color: 'danger'
                    });
                    await alert.present();

                }
            });

        } else {
            this.errorMessage = 'Something has gone wrong. Please try again.';

        }


    }


    ngOnInit() {
    }

    validateAndSanitizeEmailAndPassword(email: string, password: string): {
        isValid: boolean,
        sanitizedEmail: string,
        sanitizedPassword: string
    } {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Check if email is valid
        if (!emailRegex.test(email)) {
            this.errorMessage = "Email is not valid. Please try again."
            return {isValid: false, sanitizedEmail: '', sanitizedPassword: ''};
        }

        // Remove leading/trailing white spaces from email
        const sanitizedEmail = email.trim();

        // Sanitize password by removing leading/trailing white spaces
        const sanitizedPassword = password.trim();

        // Check if password meets certain requirements (e.g., minimum length)
        if (sanitizedPassword.length < 8) {
            this.errorMessage = "Password requirements not met. Please try again."
            return {isValid: false, sanitizedEmail, sanitizedPassword: ''};
        }

        // If all validations pass, return valid and sanitized values
        return {isValid: true, sanitizedEmail, sanitizedPassword};
    }

}
