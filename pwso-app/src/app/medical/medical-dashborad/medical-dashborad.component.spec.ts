import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalDashboradComponent } from './medical-dashborad.component';

describe('MedicalDashboradComponent', () => {
  let component: MedicalDashboradComponent;
  let mockFormBuilder;

  beforeEach(() => {
    mockFormBuilder = jasmine.createSpyObj('formBuilder', ['group']);
    component = new MedicalDashboradComponent(mockFormBuilder);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
