import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let mockFormBuilder;
  let mockStore;

  beforeEach(() => {
    mockFormBuilder = jasmine.createSpyObj('formBuilder', ['group']);
    mockStore = jasmine.createSpyObj('store', ['dispatch', 'pipe']);

    component = new RegistrationComponent(mockFormBuilder, mockStore);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
