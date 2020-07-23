import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportPickerComponent } from './sport-picker.component';

describe('SportPickerComponent', () => {
  let component: SportPickerComponent;
  let mockFormBuilder;



  beforeEach(() => {
    mockFormBuilder = jasmine.createSpyObj('formBuilder', ['group']);
    component = new SportPickerComponent(mockFormBuilder);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when a sport is selected', () => {
    it('should display comtinue instructions', () => {
      component.selectionChange(1);
      expect(component.instruction).toEqual('Press "Continue" button to continue registraion');
    });


  });
});
