import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserDataService } from '../services/user-data.service';
import { ToastController } from '@ionic/angular';
@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
    standalone: true,
    imports: [IonicModule],

})
export class NavComponent implements OnInit {

    constructor(private router: Router, private userDataService: UserDataService, private toastController: ToastController) {
    }

    goHome() {
        this.router.navigateByUrl('/home');
    }

    goAbout() {
        this.router.navigateByUrl('/about');
    }

    goEducation() {
        this.router.navigateByUrl('/education');
    }

    goLogin() {
        this.router.navigateByUrl('/login');
    }

    goSignup() {
        this.router.navigateByUrl('/signup');
    }

    goMeasure() {
        this.router.navigateByUrl('/measure');
    }

    goQuiz() {
        this.router.navigateByUrl('/quiz');
    }

    goStrategies() {
        this.router.navigateByUrl('/strategies');
    }

    goTask() {
        this.router.navigateByUrl('/task');
    }

    goTest() {
        this.router.navigateByUrl('/test');
    }

    goResults() {
        this.router.navigateByUrl('/results');
    }


    navigateTo(page: string) {
        this.router.navigateByUrl('/' + page);
    }

    ngOnInit() {
    }

    logout() {
        this.userDataService.logout().subscribe({
            next: async (response: any) => {
                const alert = await this.toastController.create({
                    message: 'Successfully logged out of your account!',
                    duration: 2000,
                    position: 'bottom',
                    color: 'success'
                });
                await alert.present();

                sessionStorage.removeItem("sessionID")
                sessionStorage.removeItem("access")
                sessionStorage.removeItem("userID")

                sessionStorage.clear();
                this.router.navigateByUrl('/login');
            },
            error: async (error) => {
                const alert = await this.toastController.create({
                    message: 'Error Logging Out. Please try again. If this error persists, please email support at kartikinpublic@gmail.com',
                    duration: 2000,
                    position: 'bottom',
                    color: 'danger'
                });
                await alert.present();

            }

        })

        sessionStorage.removeItem("sessionID")
        sessionStorage.removeItem("access")
        sessionStorage.removeItem("userID")

        sessionStorage.clear();



        this.navigateTo('/login')
    }
}
