import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Athlete } from 'src/app/models/athlete';

@Component({
  selector: 'app-athlete-information',
  templateUrl: './athlete-information.component.html',
  styleUrls: ['./athlete-information.component.scss']
})
export class AthleteInformationComponent implements OnInit {
  @Output() informationEntered = new EventEmitter();

  enableNext: boolean;
  athleteInformationForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildAthleteInformationForm(this.formBuilder);
    this.athleteInformationForm.valueChanges.subscribe(value => this.enableNextButton);
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
    this.informationEntered.emit(athlete);
  }
}
