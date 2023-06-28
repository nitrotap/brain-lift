import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { NavComponent } from './nav.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserDataService } from '../services/user-data.service';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule, NavComponent],
      providers: [UserDataService]
    }).compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#goHome should navigate to home', () => {
    spyOn(router, 'navigateByUrl');
    component.goHome();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/home');
  });

  it('#goAbout should navigate to about', () => {
    spyOn(router, 'navigateByUrl');
    component.goAbout();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/about');
  });

  // ... Repeat for each go-method ...

  it('#navigateTo should navigate to specific page', () => {
    spyOn(router, 'navigateByUrl');
    component.navigateTo('testPage');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/testPage');
  });

  // Here you could add a test for the logout method, but note that it includes a subscription which would need to be mocked.
});
