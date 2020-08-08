import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportPickerComponent } from './sport-picker.component';
import { Sport } from 'src/app/models/sport';
import { of } from 'rxjs';

describe('SportPickerComponent', () => {
  let component: SportPickerComponent;
  let mockFormBuilder;
  let mockStore;
  let selectedSport: Sport;



  beforeEach(() => {
    mockFormBuilder = jasmine.createSpyObj('formBuilder', ['group']);
    mockStore = jasmine.createSpyObj('store', ['dispatch', 'pipe']);
    component = new SportPickerComponent(mockFormBuilder, mockStore);
    const mockSportName = jasmine.createSpyObj('sportName', ['setValue']);
    component.sportName = mockSportName;
    const mockProgramName = jasmine.createSpyObj('programName', ['setValue']);
    component.programName = mockProgramName;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when a sport is selected and more than 1 program', () => {

    beforeEach(() => {
      spyOn(component, 'enableContinueButton').and.returnValue(null);
      spyOn(component, 'getProgramsForSport').and.returnValue(3);
      selectedSport = {id: 1, canRegister: true, hasUniform: false, isTeamSport: false, name: 'Bowling'};
   });

    it('should display comtinue instructions', () => {
      component.selectionSport(selectedSport);

      expect(component.instruction).toEqual('Select a Program / Location');
    });

    it('should set selected Progam to be null', () => {
      component.selectionSport(selectedSport);

      expect(component.selectedProgram).toBeNull();
    });

    it('should set show Program Dropdown', () => {
      component.selectionSport(selectedSport);

      expect(component.showProgram).toBeTruthy();
    });

    it('should enable cancel button', () => {
      component.selectionSport(selectedSport);

      expect(component.canCancel).toBeTruthy();
    });

  });

  describe('when a sport is selected and only 1 program', () => {

    beforeEach(() => {
      const mockSportName = jasmine.createSpyObj('sportName', ['setValue']);
      spyOn(component, 'enableContinueButton').and.returnValue(null);
      spyOn(component, 'getProgramsForSport').and.returnValue(1);
      spyOn(component, 'setProgram').and.returnValue(null);
      component.sportName = mockSportName;
      selectedSport = {id: 1, canRegister: true, hasUniform: false, isTeamSport: false, name: 'Bowling'};
      // component.programList = [{id: 1, name: 'Woodbrige', sportid: 4 }]


    });

    it('should call setProgram', () => {
      component.selectionSport(selectedSport);

      expect(component.setProgram).toHaveBeenCalled();
    });

  });

  describe('when continue button is clicked', () => {

    beforeEach(() => {
      component.canContinue = true;
      spyOn(component, 'disableControls').and.returnValue(null);
    });

    it('should hide contiue button', () => {
      component.clickContinue();

      expect(component.canContinue).toBeFalsy();
    });

    it('should have called disable components', () => {
      component.clickContinue();

      expect(component.disableControls).toHaveBeenCalled();
    });


    it('should disply registration message', () => {
      component.clickContinue();

      expect(component.instruction).toBe('Press "Submit" button to complete registration');
    });

  });

  describe('when cancel button is clicked', () => {

    beforeEach(() => {
      component.canContinue = true;
      component.canCancel = true;
      component.showProgram = true;
      component.selectedSport = {id: 1, canRegister: true, hasUniform: false, isTeamSport: false, name: 'Bowling'};
      spyOn(component, 'enableControls').and.returnValue(null);

    });

    it('should hide program dropdown', () => {
      component.clickCancel();

      expect(component.showProgram).toBeFalsy();
    });

    it('should have called enable dropdowns', () => {
      component.clickCancel();

      expect(component.enableControls).toHaveBeenCalled();
    });

    it('should have unselect sports', () => {
      component.clickCancel();

      expect(component.selectedSport).toBeNull();
    });

    it('should have unselect programs', () => {
      component.clickCancel();

      expect(component.selectedProgram).toBeNull();
    });

    it('should have can continue to be false', () => {
      component.clickCancel();

      expect(component.canContinue).toBeFalsy();
    });

    it('should disable cancel button', () => {
      component.clickCancel();

      expect(component.canCancel).toBeFalsy();
    });

    it('should hide program dropdown', () => {
      component.clickCancel();

      expect(component.showProgram).toBeFalsy();
    });

    it('should display initial instructions', () => {
      component.clickCancel();

      expect(component.instruction).toEqual('Select a sport for registration');
    });
  });

  describe('when settingt the Program dropdown', () => {

    beforeEach(() => {
      const mockSportName = jasmine.createSpyObj('sportName', ['setValue']);
      spyOn(component, 'enableContinueButton').and.returnValue(null);
      spyOn(component, 'getProgramsForSport').and.returnValue(1);
      // spyOn(component, 'setProgram').and.returnValue(null);
      component.sportName = mockSportName;
      selectedSport = {id: 1, canRegister: true, hasUniform: false, isTeamSport: false, name: 'Bowling'};
      component.programList$ = of([{id: 1, name: 'Woodbrige', sportid: 4 }])


    });

    it('should set not to show Program Dropdown', () => {
      component.showProgram = true;

      component.setProgram();

      expect(component.showProgram).toBeFalsy();
    });

  });
});
