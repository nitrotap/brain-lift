import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserDataService} from '../services/user-data.service';
import {ToastController} from '@ionic/angular';
import jwt_decode, {JwtPayload} from 'jwt-decode'

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    email: any;
    password: any;
    errorMessage: any;

    constructor(private router: Router, private userDataService: UserDataService, private toastController: ToastController) {
    }

    async login(email: string, password: string) {

        const result = this.validateAndSanitizeEmailAndPassword(email, password);

        if (result.isValid) {
            let formData = {
                "email": result.sanitizedEmail,
                "password": result.sanitizedPassword
            }

            this.userDataService.login(formData).subscribe({
                next: async (response: any) => {
                    // console.log(response)
                    // decode response.sessionID
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
                            message: 'Successfully logged into your account!',
                            duration: 2000,
                            position: 'bottom',
                            color: 'success'
                        });
                        await alert.present();
                        this.router.navigateByUrl('/results');


                    }


                },
                error: async (error) => {
                    const alert = await this.toastController.create({
                        message: error.error.error,
                        duration: 2000,
                        position: 'bottom',
                        color: 'danger'
                    });
                    await alert.present();

                }
            });

        } else {
            this.errorMessage = 'Something has gone wrong. Please try again.';
            const alert = await this.toastController.create({
                message: 'Unable to log into your account! Please try again!',
                duration: 2000,
                position: 'bottom',
                color: 'success'
            });
            await alert.present();


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
