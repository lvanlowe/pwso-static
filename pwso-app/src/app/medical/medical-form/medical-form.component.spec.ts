import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalFormComponent } from './medical-form.component';

describe('MedicalFormComponent', () => {
  let component: MedicalFormComponent;
  let mockFormBuilder;

  beforeEach(() => {
    mockFormBuilder = jasmine.createSpyObj('formBuilder', ['group']);
    component = new MedicalFormComponent(mockFormBuilder);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
