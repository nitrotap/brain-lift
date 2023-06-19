import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EducationPageRoutingModule } from './education-routing.module';

import { EducationPage } from './education.page';

import { NavComponent } from '../nav/nav.component';
import { FooterPage } from '../footer/footer.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EducationPageRoutingModule,
    NavComponent,
    FooterPage
  ],
  declarations: [EducationPage]
})
export class EducationPageModule { }
