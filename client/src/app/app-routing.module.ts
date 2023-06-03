import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'education',
    loadChildren: () => import('./education/education.module').then(m => m.EducationPageModule)
  },
  {
    path: 'measure',
    loadChildren: () => import('./measure/measure.module').then(m => m.MeasurePageModule)
  },
  {
    path: 'strategies',
    loadChildren: () => import('./strategies/strategies.module').then(m => m.StrategiesPageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then(m => m.TestPageModule)
  },
  {
    path: 'navigation',
    loadChildren: () => import('./navigation/navigation.module').then(m => m.NavigationPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule)
  },  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})


export class AppRoutingModule { }