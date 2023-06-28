import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserDataService } from './user-data.service';

describe('UserDataService', () => {
  let service: UserDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });

    service = TestBed.inject(UserDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getData should use GET to retrieve data', () => {
    service.getData().subscribe();

    const req = httpMock.expectOne('https://www.brain-lift.org/brain-lift/server/api/user/');
    expect(req.request.method).toEqual('GET');
  });

  it('#postData should use POST to send data', () => {
    const dummyFormData = { test: 'test' };

    service.postData(dummyFormData).subscribe();

    const req = httpMock.expectOne('https://www.brain-lift.org/brain-lift/server/api/user/');
    expect(req.request.method).toEqual('POST');
  });

  // Add similar tests for updateData, deleteData, login, logout, startSession, getSessionData...

});
