import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StrategiesPage } from './strategies.page';

const routes: Routes = [
  {
    path: '',
    component: StrategiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StrategiesPageRoutingModule {}
