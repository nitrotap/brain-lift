import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-education',
    templateUrl: './education.page.html',
    styleUrls: ['./education.page.scss'],
})
export class EducationPage implements OnInit {

    constructor(private router: Router) {
    }

    goToStrategies() {
        this.router.navigateByUrl('/strategies')
    }

    goToMeasure() {
        this.router.navigateByUrl('/measure')
    }

    ngOnInit() {
    }

    public currentLoad: string = 'intrinsic';
    public gridColor: string = 'rgb(48,151,116)';

    cogLoad(state: string): void {

        this.currentLoad = state;

        let intrinsic = 'rgb(48,151,116)'
        let extraneous = 'rgb(23,122,121)'
        let germane = 'rgb(12, 85, 96)'

        switch (this.currentLoad) {
            case 'none':
                this.currentLoad = 'intrinsic';
                this.gridColor = intrinsic;

                break;
            case 'i':
                this.currentLoad = 'intrinsic';
                this.gridColor = intrinsic;

                break;
            case 'e':
                this.currentLoad = 'extraneous';
                this.gridColor = extraneous;

                break;
            case 'g':
                this.currentLoad = 'germane';
                this.gridColor = germane;

                break;
            default:
                this.currentLoad = 'intrinsic';
                this.gridColor = intrinsic;

                break;
        }


        // switch (this.currentLoad) {
        //     case 'none':
        //         this.currentLoad = 'intrinsic';
        //         break;
        //     case 'intrinsic':
        //         this.currentLoad = 'extraneous';
        //         break;
        //     case 'extraneous':
        //         this.currentLoad = 'germane';
        //         break;
        //     default:
        //         this.currentLoad = 'none';
        //         break;
        // }
    }


}
