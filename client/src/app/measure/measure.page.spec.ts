import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeasurePage } from './measure.page';

describe('MeasurePage', () => {
  let component: MeasurePage;
  let fixture: ComponentFixture<MeasurePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MeasurePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
