import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StrategiesPage } from './strategies.page';

describe('StrategiesPage', () => {
  let component: StrategiesPage;
  let fixture: ComponentFixture<StrategiesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StrategiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
