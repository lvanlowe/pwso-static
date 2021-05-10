import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleteParentComponent } from './athlete-parent.component';

describe('AthleteParentComponent', () => {
  let component: AthleteParentComponent;
  let mockFormBuilder;
  let mockStore

  beforeEach(() => {
    mockFormBuilder = jasmine.createSpyObj('formBuilder', ['group']);
    mockStore = jasmine.createSpyObj('store', ['dispatch', 'pipe']);
    component = new AthleteParentComponent(mockFormBuilder, mockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
