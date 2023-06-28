import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupPage } from './signup.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserDataService } from '../services/user-data.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


import { of } from 'rxjs';

describe('SignupPage', () => {
  let component: SignupPage;
  let fixture: ComponentFixture<SignupPage>;
  let userDataService: UserDataService;
  let toastController: ToastController;
  let router: Router;

  beforeEach(async () => {
    let httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [SignupPage],
      providers: [
        { provide: UserDataService, useValue: jasmine.createSpyObj('UserDataService', ['postData']) },
        { provide: ToastController, useValue: jasmine.createSpyObj('ToastController', ['create']) },
        { provide: HttpClient, useValue: httpClientSpy },
      ]
    })
      .compileComponents();


    userDataService = TestBed.inject(UserDataService);
    toastController = TestBed.inject(ToastController);
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(SignupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should attempt signup with email and password', () => {
    const spyNavigateByUrl = spyOn(router, 'navigateByUrl');
    const response = { sessionID: 'sessionId', Authorization: 'auth' };
    (userDataService.postData as jasmine.Spy).and.returnValue(of(response));
    (toastController.create as jasmine.Spy).and.returnValue(Promise.resolve({
      present: () => Promise.resolve()
    } as HTMLIonToastElement));
    component.signup('test@test.com', 'password');
    fixture.detectChanges();
    expect(userDataService.postData).toHaveBeenCalled();
    expect(toastController.create).toHaveBeenCalled();
    expect(spyNavigateByUrl).toHaveBeenCalledWith('/task');
  });

  // Add more tests here for validating and sanitizing email/password
  it('should validate and sanitize the input', () => {
    let result = component.validateAndSanitizeEmailAndPassword(' test@test.com ', ' password ');
    expect(result).toEqual({ isValid: true, sanitizedEmail: 'test@test.com', sanitizedPassword: 'password' });

    result = component.validateAndSanitizeEmailAndPassword('invalid', ' password ');
    expect(result).toEqual({ isValid: false, sanitizedEmail: '', sanitizedPassword: '' });

    result = component.validateAndSanitizeEmailAndPassword('test@test.com', 'pass');
    expect(result).toEqual({ isValid: false, sanitizedEmail: 'test@test.com', sanitizedPassword: '' });
  });
});
