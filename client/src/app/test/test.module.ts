import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestPageRoutingModule } from './test-routing.module';

import { TestPage } from './test.page';

import { HttpClientModule } from '@angular/common/http';

import { NavComponent } from '../nav/nav.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestPageRoutingModule,
    HttpClientModule,
    NavComponent
  ],
  declarations: [TestPage]
})
export class TestPageModule { }
