import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Update } from '@briebug/ngrx-auto-entity';
import { select, Store } from '@ngrx/store';
import { Athlete, AthleteParent } from 'src/app/models/athlete';
import { AppState } from 'src/app/state/app.state';
import { currentAthlete, loadingAthlete } from 'src/app/state/athlete.state';

@Component({
  selector: 'app-athlete-parent',
  templateUrl: './athlete-parent.component.html',
  styleUrls: ['./athlete-parent.component.scss']
})
export class AthleteParentComponent implements OnInit {

  @Output() informationEntered = new EventEmitter();

  @Input() isAdd: boolean;

  enableNext: boolean;
  public mask = '(000) 000-0000';
  action: string;
  athleteParentForm: FormGroup;
  isLoadingAthlete: boolean;
  currentAthlete: Athlete;
  canAddParent: boolean;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }

  ngOnInit() {
    this.isLoadingAthlete = false;
    this.buildAthleteParentForm(this.formBuilder);
    this.athleteParentForm.markAsPristine();
    this.athleteParentForm.valueChanges.subscribe(() => {this.enableNextButton(); } );
    this.canAddParent = false;
    if (this.isAdd) {
      this.action = 'Next';
    }
    else {
      this.action = 'Save';
      this.store.pipe(select(loadingAthlete))
      .subscribe(async loading => {
        this.isLoadingAthlete = loading;
        console.log(this.isLoadingAthlete)
        if (!loading) {
          await this.delay(10);
          this.fillInForm();
        }
      });

    }
  }

  buildAthleteParentForm(formBuilder: FormBuilder) {
    this.athleteParentForm = formBuilder.group(
      {
        parentName: new FormControl(),
        relationship: new FormControl(),
        parentStreet: new FormControl(''),
        parentCity: new FormControl(''),
        parentState: new FormControl(''),
        parentZipCode: new FormControl(''),
        parentPhone: new FormControl(''),
        parentEmail: new FormControl('', Validators.email),
      }
    );
  }

  fillInForm() {
    const athlete$ = this.store.pipe(select(currentAthlete));
    athlete$.subscribe(results => { this.currentAthlete = results; });
    console.log(this.currentAthlete)
    if (this.currentAthlete.parentInformation) {
      this.athleteParentForm.patchValue(this.currentAthlete.parentInformation[0]);
    }

    this.enableNext = false;
  }

  enableNextButton() {
    this.parentValidationRequired();
    this.addressValidationComplete();
    if (this.athleteParentForm.valid && !this.athleteParentForm.errors) {
      this.enableNext = true;
      this.checkForNewParent()
    } else {
      this.enableNext = false;
    }
  }

  checkForNewParent() {
    // if (this.athleteParentForm.controls.parentName.value)
    // {
    //   this.canAddParent = true;
    // }
  }

  nextStep() {
    const athlete: AthleteParent = {
      ...this.athleteParentForm.value
    };
    if (this.isAdd) {
      this.informationEntered.emit(athlete);
    }
    else {
      this.store.dispatch(new Update(Athlete, this.currentAthlete));
      this.enableNext = false;
    }
  }

  // noErrorFound(): boolean {

  //   if (this.athleteParentForm.controls.relationship.value ||
  //       this.athleteParentForm.controls.parentStreet.value ||
  //       this.athleteParentForm.controls.parentCity.value ||
  //       this.athleteParentForm.controls.parentState.value ||
  //       this.athleteParentForm.controls.parentZipCode.value ||
  //       this.athleteParentForm.controls.parentPhone.value ||
  //       this.athleteParentForm.controls.parentEmail.value) {
  //     if (this.athleteParentForm.controls.parentName.value) {
  //       return true;
  //     }
  //     else {
  //       this.athleteParentForm.controls.parentName.setErrors({ parentRequired: true });
  //       return false;
  //     }
  //   }
  //   return true;
  // }

  parentValidationRequired() {
    if ((this.athleteParentForm.controls.relationship.value ||
         this.athleteParentForm.controls.parentStreet.value ||
         this.athleteParentForm.controls.parentCity.value ||
         this.athleteParentForm.controls.parentState.value ||
         this.athleteParentForm.controls.parentZipCode.value ||
         this.athleteParentForm.controls.parentPhone.value ||
         this.athleteParentForm.controls.parentEmail.value) &&
        !this.athleteParentForm.controls.parentName.value) {
          this.athleteParentForm.controls.parentName.setErrors({ parentRequired: true });
        }
  }

  addressValidationComplete(){
    if ((this.athleteParentForm.controls.parentStreet.value &&
      this.athleteParentForm.controls.parentCity.value &&
      this.athleteParentForm.controls.parentZipCode.value &&
      this.athleteParentForm.controls.parentState.value) ||
      (!this.athleteParentForm.controls.parentStreet.value &&
        !this.athleteParentForm.controls.parentCity.value &&
        !this.athleteParentForm.controls.parentZipCode.value &&
        !this.athleteParentForm.controls.parentState.value)) {
    } else {
      this.athleteParentForm.controls.parentStreet.setErrors({ addressComplete: true });
      this.athleteParentForm.controls.parentCity.setErrors({ addressComplete: true });
      this.athleteParentForm.controls.parentState.setErrors({ addressComplete: true });
      this.athleteParentForm.controls.parentZipCode.setErrors({ addressComplete: true });
    }
  }


  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }


}
