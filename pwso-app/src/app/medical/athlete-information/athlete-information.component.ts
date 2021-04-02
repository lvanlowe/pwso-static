import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Update } from '@briebug/ngrx-auto-entity';
import { select, Store } from '@ngrx/store';
import { Athlete } from 'src/app/models/athlete';
import { AppState } from 'src/app/state/app.state';
import { currentAthlete } from 'src/app/state/athlete.state';

@Component({
  selector: 'app-athlete-information',
  templateUrl: './athlete-information.component.html',
  styleUrls: ['./athlete-information.component.scss']
})
export class AthleteInformationComponent implements OnInit {
  @Output() informationEntered = new EventEmitter();

  @Input() isAdd: boolean;

  enableNext: boolean;
  public mask = '(000) 000-0000';
  public zipmask = '00000';
  action: string;
  athleteInformationForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }

  ngOnInit() {
    this.buildAthleteInformationForm(this.formBuilder);
    this.athleteInformationForm.markAsPristine();
    this.athleteInformationForm.valueChanges.subscribe(() => {this.enableNextButton(); } );
    if (this.isAdd) {
      this.action = 'Next';
    }
    else {
      this.action = 'Save';
      this.fillInForm();
    }
  }

  buildAthleteInformationForm(formBuilder: FormBuilder) {
    this.athleteInformationForm = formBuilder.group(
      {
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        middleName: new FormControl(),
        birthDate: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.email, Validators.required]),
        gender: new FormControl('', Validators.required),
        street: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        zipCode: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required),
      }
    );
    this.athleteInformationForm.controls.state.setValue('VA');
  }

  fillInForm() {
    let athlete = new Athlete
    const athlete$ = this.store.pipe(select(currentAthlete));
    athlete$.subscribe(results => { athlete = results; });
    this.athleteInformationForm.patchValue(athlete);
    if (athlete.birthDate !== null) {
      this.athleteInformationForm.controls.birthDate.setValue(new Date(athlete.birthDate))
    }
    this.enableNext = false;
  }

  enableNextButton() {
    if (this.athleteInformationForm.valid && !this.athleteInformationForm.errors) {
      this.enableNext = true;
    } else {
      this.enableNext = false;
    }
  }

  nextStep() {
    const athlete: Athlete = {
      ...this.athleteInformationForm.value
    };
    if (this.isAdd) {
      this.informationEntered.emit(athlete);
    }
    else {
      this.store.dispatch(new Update(Athlete, athlete));
      this.enableNext = false;
    }

  }
}
