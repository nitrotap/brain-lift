import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PolicyPageRoutingModule } from './policy-routing.module';

import { PolicyPage } from './policy.page';
import { NavComponent } from "../nav/nav.component";
import { FooterPage } from '../footer/footer.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PolicyPageRoutingModule,
        NavComponent,
        FooterPage
    ],
    declarations: [PolicyPage]
})
export class PolicyPageModule {
}
