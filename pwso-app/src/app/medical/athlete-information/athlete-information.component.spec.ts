import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleteInformationComponent } from './athlete-information.component';

describe('AthleteInformationComponent', () => {
  let component: AthleteInformationComponent;
  let mockFormBuilder;
  let mockStore



  beforeEach(() => {
    mockFormBuilder = jasmine.createSpyObj('formBuilder', ['group']);
    mockStore = jasmine.createSpyObj('store', ['dispatch', 'pipe']);
    component = new AthleteInformationComponent(mockFormBuilder, mockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
