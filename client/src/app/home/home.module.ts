import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { NavComponent } from '../nav/nav.component';
import { FooterPage } from '../footer/footer.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NavComponent,
    FooterPage
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
