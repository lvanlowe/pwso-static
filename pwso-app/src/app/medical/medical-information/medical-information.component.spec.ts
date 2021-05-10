import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalInformationComponent } from './medical-information.component';

describe('MedicalInformationComponent', () => {
  let component: MedicalInformationComponent;
  let mockFormBuilder;
  let mockStore


  beforeEach(() => {
    mockFormBuilder = jasmine.createSpyObj('formBuilder', ['group']);
    mockStore = jasmine.createSpyObj('store', ['dispatch', 'pipe']);
    component = new MedicalInformationComponent(mockFormBuilder, mockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
