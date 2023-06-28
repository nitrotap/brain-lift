import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskDataService } from './task-data.service';
import { HttpClient } from '@angular/common/http';

describe('TaskDataService', () => {
  let service: TaskDataService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new TaskDataService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch data', () => {
    service.getData();
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should fetch task data', () => {
    service.getTaskData();
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

  it('should post data', () => {
    service.postData({});
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

  it('should update data', () => {
    service.updateData({});
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

  it('should delete data', () => {
    service.deleteData({});
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });
});
