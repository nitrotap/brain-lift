import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

import { NavComponent } from '../nav/nav.component';
import { FooterPage } from '../footer/footer.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    NavComponent,
    FooterPage
  ],
  declarations: [LoginPage]
})
export class LoginPageModule { }
