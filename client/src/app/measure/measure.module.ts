import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeasurePageRoutingModule } from './measure-routing.module';

import { MeasurePage } from './measure.page';

import { NavComponent } from '../nav/nav.component';
import { FooterPage } from '../footer/footer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeasurePageRoutingModule,
    NavComponent,
    FooterPage
  ],
  declarations: [MeasurePage]
})
export class MeasurePageModule { }
