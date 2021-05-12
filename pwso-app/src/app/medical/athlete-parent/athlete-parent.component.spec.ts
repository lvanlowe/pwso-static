import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ValidationErrors } from '@angular/forms';

import { AthleteParentComponent } from './athlete-parent.component';

fdescribe('AthleteParentComponent', () => {
  let component: AthleteParentComponent;
  let formBuilder: FormBuilder
  let mockStore

  beforeEach(() => {
    formBuilder = new FormBuilder();
    mockStore = jasmine.createSpyObj('store', ['dispatch', 'pipe']);

    component = new AthleteParentComponent(formBuilder, mockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('validate parent name', () => {

    beforeEach(() => {
      component.buildAthleteParentForm(formBuilder)
    });

    it('when relationship and no parent then parent required error', () => {

      component.athleteParentForm.controls.relationship.setValue("mother")
      component.parentValidationRequired();

      expect(component.athleteParentForm.controls.parentName.errors).toEqual({ parentRequired: true });
    });

    it('when street and no parent then parent required error', () => {

      component.athleteParentForm.controls.parentStreet.setValue("123 Main Street")
      component.parentValidationRequired();

      expect(component.athleteParentForm.controls.parentName.errors).toEqual({ parentRequired: true });
    });

    it('when city and no parent then parent required error', () => {

      component.athleteParentForm.controls.parentCity.setValue("Gotham City")
      component.parentValidationRequired();

      expect(component.athleteParentForm.controls.parentName.errors).toEqual({ parentRequired: true });
    });

    it('when state and no parent then parent required error', () => {

      component.athleteParentForm.controls.parentState.setValue("Gotham City")
      component.parentValidationRequired();

      expect(component.athleteParentForm.controls.parentName.errors).toEqual({ parentRequired: true });
    });

    it('when zip code and no parent then parent required error', () => {

      component.athleteParentForm.controls.parentZipCode.setValue("10456")
      component.parentValidationRequired();

      expect(component.athleteParentForm.controls.parentName.errors).toEqual({ parentRequired: true });
    });

    it('when phone and no parent then parent required error', () => {

      component.athleteParentForm.controls.parentPhone.setValue("2125551212")
      component.parentValidationRequired();

      expect(component.athleteParentForm.controls.parentName.errors).toEqual({ parentRequired: true });
    });

    it('when email and no parent then parent required error', () => {

      component.athleteParentForm.controls.parentEmail.setValue("www@gmail.com")
      component.parentValidationRequired();

      expect(component.athleteParentForm.controls.parentName.errors).toEqual({ parentRequired: true });
    });

    it('when relationship and parent then no parent required error', () => {

      component.athleteParentForm.controls.relationship.setValue("mother")
      component.athleteParentForm.controls.parentName.setValue("Lois Lane")
      component.parentValidationRequired();

      expect(component.athleteParentForm.controls.parentName.errors).not.toEqual({ parentRequired: true });
    });
  })
});
