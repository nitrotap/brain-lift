import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StrategiesPageRoutingModule } from './strategies-routing.module';

import { StrategiesPage } from './strategies.page';

import { NavComponent } from '../nav/nav.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StrategiesPageRoutingModule,
    NavComponent
  ],
  declarations: [StrategiesPage]
})
export class StrategiesPageModule { }
