import { ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskPageRoutingModule } from './task-routing.module';

import { TaskPage } from './task.page';
import { NavComponent } from '../nav/nav.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TaskPageRoutingModule,
    NavComponent
  ],
  declarations: [TaskPage]
})
export class TaskPageModule { }
