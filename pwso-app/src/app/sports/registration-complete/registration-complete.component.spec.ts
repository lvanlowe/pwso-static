import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationCompleteComponent } from './registration-complete.component';

describe('RegistrationCompleteComponent', () => {
  let component: RegistrationCompleteComponent;
  let mockFormBuilder;
  let mockStore
  let mockRouter


  beforeEach(() => {
    mockFormBuilder = jasmine.createSpyObj('formBuilder', ['group']);
    mockStore = jasmine.createSpyObj('store', ['dispatch', 'pipe']);
    mockRouter = jasmine.createSpyObj('router', ['dispatch', 'navigate']);
    component = new RegistrationCompleteComponent(mockFormBuilder, mockRouter, mockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
