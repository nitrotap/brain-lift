import {Component, OnInit} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {Router} from '@angular/router';


@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
    standalone: true,
    imports: [IonicModule],

})
export class NavComponent implements OnInit {

    constructor(private router: Router) {
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
        sessionStorage.removeItem("sessionID")
        sessionStorage.removeItem("access")
        sessionStorage.removeItem("userID")

        sessionStorage.clear();

        this.navigateTo('/home')
    }
}
