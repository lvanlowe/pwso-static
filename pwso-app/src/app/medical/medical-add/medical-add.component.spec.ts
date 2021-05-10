import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalAddComponent } from './medical-add.component';

describe('MedicalAddComponent', () => {
  let component: MedicalAddComponent;
  let mockFormBuilder;
  let mockStore

  beforeEach(() => {
    mockFormBuilder = jasmine.createSpyObj('formBuilder', ['group']);
    mockStore = jasmine.createSpyObj('store', ['dispatch', 'pipe']);
    component = new MedicalAddComponent(mockFormBuilder, mockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
