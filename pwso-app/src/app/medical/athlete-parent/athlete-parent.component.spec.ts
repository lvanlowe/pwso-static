import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ValidationErrors } from '@angular/forms';

import { AthleteParentComponent } from './athlete-parent.component';

describe('AthleteParentComponent', () => {
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

  describe('validate', () => {

    beforeEach(() => {
      component.buildAthleteParentForm(formBuilder)
    });

    describe('parent name', () => {

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

    describe('address', () => {
      it('when street and no city then street has address complete error', () => {

        component.athleteParentForm.controls.parentStreet.setValue("123 Main Street")
        component.addressValidationComplete();

        expect(component.athleteParentForm.controls.parentStreet.errors).toEqual({ addressComplete: true });
      });

      it('when street and no city then city has address complete error', () => {

        component.athleteParentForm.controls.parentStreet.setValue("123 Main Street")
        component.addressValidationComplete();

        expect(component.athleteParentForm.controls.parentCity.errors).toEqual({ addressComplete: true });
      });

      it('when street and no state then street has address complete error', () => {

        component.athleteParentForm.controls.parentStreet.setValue("123 Main Street")
        component.athleteParentForm.controls.parentCity.setValue("Gotham City")
        component.addressValidationComplete();

        expect(component.athleteParentForm.controls.parentStreet.errors).toEqual({ addressComplete: true });
      });

      it('when street and no state then state has address complete error', () => {

        component.athleteParentForm.controls.parentStreet.setValue("123 Main Street")
        component.athleteParentForm.controls.parentCity.setValue("Gotham City")
        component.addressValidationComplete();

        expect(component.athleteParentForm.controls.parentState.errors).toEqual({ addressComplete: true });
      });

      it('when street and no zip then zip has address complete error', () => {

        component.athleteParentForm.controls.parentStreet.setValue("123 Main Street")
        component.athleteParentForm.controls.parentCity.setValue("Gotham City")
        component.addressValidationComplete();

        expect(component.athleteParentForm.controls.parentZipCode.errors).toEqual({ addressComplete: true });
      });

      it('when city and no zip then state has address complete error', () => {

        component.athleteParentForm.controls.parentStreet.setValue("123 Main Street")
        component.athleteParentForm.controls.parentCity.setValue("Gotham City")
        component.addressValidationComplete();

        expect(component.athleteParentForm.controls.parentState.errors).toEqual({ addressComplete: true });
      });

      it('when no street and no city then street has no address complete error', () => {

        component.addressValidationComplete();

        expect(component.athleteParentForm.controls.parentStreet.errors).not.toEqual({ addressComplete: true });
      });

      it('when street and city then street has no address complete error', () => {

        component.athleteParentForm.controls.parentStreet.setValue("123 Main Street")
        component.athleteParentForm.controls.parentCity.setValue("Gotham City")
        component.athleteParentForm.controls.parentState.setValue("VA")
        component.athleteParentForm.controls.parentZipCode.setValue("10456")
        component.addressValidationComplete();

        expect(component.athleteParentForm.controls.parentStreet.errors).not.toEqual({ addressComplete: true });
      });
    })

    describe('add another parent form', () => {

      it('when no parent then new parent form can not be added', () => {

        component.canAddParent = false;
        component.checkForNewParent();

        expect(component.canAddParent).toBeFalsy();
      });

      // xit('when street and no parent then parent required error', () => {

      //   component.athleteParentForm.controls.parentStreet.setValue("123 Main Street")
      //   component.parentValidationRequired();

      //   expect(component.athleteParentForm.controls.parentName.errors).toEqual({ parentRequired: true });
      // });

      // xit('when city and no parent then parent required error', () => {

      //   component.athleteParentForm.controls.parentCity.setValue("Gotham City")
      //   component.parentValidationRequired();

      //   expect(component.athleteParentForm.controls.parentName.errors).toEqual({ parentRequired: true });
      // });

      // xit('when state and no parent then parent required error', () => {

      //   component.athleteParentForm.controls.parentState.setValue("Gotham City")
      //   component.parentValidationRequired();

      //   expect(component.athleteParentForm.controls.parentName.errors).toEqual({ parentRequired: true });
      // });

      // xit('when zip code and no parent then parent required error', () => {

      //   component.athleteParentForm.controls.parentZipCode.setValue("10456")
      //   component.parentValidationRequired();

      //   expect(component.athleteParentForm.controls.parentName.errors).toEqual({ parentRequired: true });
      // });

      // xit('when phone and no parent then parent required error', () => {

      //   component.athleteParentForm.controls.parentPhone.setValue("2125551212")
      //   component.parentValidationRequired();

      //   expect(component.athleteParentForm.controls.parentName.errors).toEqual({ parentRequired: true });
      // });

      // xit('when email and no parent then parent required error', () => {

      //   component.athleteParentForm.controls.parentEmail.setValue("www@gmail.com")
      //   component.parentValidationRequired();

      //   expect(component.athleteParentForm.controls.parentName.errors).toEqual({ parentRequired: true });
      // });

      // xit('when relationship and parent then no parent required error', () => {

      //   component.athleteParentForm.controls.relationship.setValue("mother")
      //   component.athleteParentForm.controls.parentName.setValue("Lois Lane")
      //   component.parentValidationRequired();

      //   expect(component.athleteParentForm.controls.parentName.errors).not.toEqual({ parentRequired: true });
      // });

    })

  })
});
