import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleteListComponent } from './athlete-list.component';

describe('AthleteListComponent', () => {
  let component: AthleteListComponent;
  let mockStore

  beforeEach(() => {
    mockStore = jasmine.createSpyObj('store', ['dispatch', 'pipe']);
    component = new AthleteListComponent(mockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
