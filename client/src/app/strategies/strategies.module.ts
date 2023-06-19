import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StrategiesPageRoutingModule } from './strategies-routing.module';

import { StrategiesPage } from './strategies.page';

import { NavComponent } from '../nav/nav.component';
import { FooterPage } from '../footer/footer.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StrategiesPageRoutingModule,
    NavComponent,
    FooterPage
  ],
  declarations: [StrategiesPage]
})
export class StrategiesPageModule { }
