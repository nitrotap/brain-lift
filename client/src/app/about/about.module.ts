import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutPageRoutingModule } from './about-routing.module';

import { AboutPage } from './about.page';

import { NavComponent } from '../nav/nav.component';
import { FooterPage } from '../footer/footer.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AboutPageRoutingModule,
        NavComponent,
        FooterPage
    ],
    declarations: [AboutPage]
})
export class AboutPageModule {
}
