import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Athlete } from 'src/app/models/athlete';
import { AppState } from 'src/app/state/app.state';
import { currentAthlete, loadingAthlete } from 'src/app/state/athlete.state';

@Component({
  selector: 'app-medical-information',
  templateUrl: './medical-information.component.html',
  styleUrls: ['./medical-information.component.scss']
})
export class MedicalInformationComponent implements OnInit {
  @Output() informationEntered = new EventEmitter();

  @Input() isAdd: boolean;

  enableNext: boolean;
  medicalInformationForm: FormGroup;
  isLoadingAthlete: boolean;
  currentAthlete: Athlete;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }

  ngOnInit() {
    this.isLoadingAthlete = false;
    this.buildMedicalInformationForm(this.formBuilder);
    this.medicalInformationForm.markAsPristine();
    this.medicalInformationForm.valueChanges.subscribe(() => {this.enableNextButton(); } );
    if (!this.isAdd) {
      this.store.pipe(select(loadingAthlete))
      .subscribe(async loading => {
        this.isLoadingAthlete = loading;
        if (!loading) {
          await this.delay(10);
          this.fillInForm();
        }
      });
    }
  }

  buildMedicalInformationForm(formBuilder: FormBuilder) {
    this.medicalInformationForm = formBuilder.group(
      {
        medicalDate: new FormControl('', Validators.required),
        medicalExpirationDate: new FormControl('', Validators.required),
      }
    );
  }

  fillInForm() {
    const athlete$ = this.store.pipe(select(currentAthlete));
    athlete$.subscribe(results => { this.currentAthlete = results; });
    console.log(this.currentAthlete)
    if (this.currentAthlete) {
      if (this.currentAthlete.medicalDate !== null) {
        this.medicalInformationForm.controls.medicalDate.setValue(new Date(this.currentAthlete.medicalDate))
      }
      if (this.currentAthlete.medicalExpirationDate !== null) {
        this.medicalInformationForm.controls.medicalExpirationDate.setValue(new Date(this.currentAthlete.medicalExpirationDate))
      }
    }

    this.enableNext = false;
  }

  enableNextButton() {
    if (this.medicalInformationForm.valid && !this.medicalInformationForm.errors) {
      this.enableNext = true;
    } else {
      this.enableNext = false;
    }
  }

  nextStep() {
    const athlete: Athlete = {
      ...this.medicalInformationForm.value
    };
    this.informationEntered.emit(athlete);
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
