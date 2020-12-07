import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Athlete } from 'src/app/models/athlete';

@Component({
  selector: 'app-medical-information',
  templateUrl: './medical-information.component.html',
  styleUrls: ['./medical-information.component.scss']
})
export class MedicalInformationComponent implements OnInit {
  @Output() informationEntered = new EventEmitter();

  enableNext: boolean;
  medicalInformationForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildMedicalInformationForm(this.formBuilder);
    this.medicalInformationForm.valueChanges.subscribe(value => this.enableNextButton);
  }

  buildMedicalInformationForm(formBuilder: FormBuilder) {
    this.medicalInformationForm = formBuilder.group(
      {
        medicalDate: new FormControl('', Validators.required),
        medicalExpirationDate: new FormControl('', Validators.required),
      }
    );
  }

  enableNextButton() {
    // if (this.athleteInformationForm.valid && !this.athleteInformationForm.errors) {
      this.enableNext = true;
    // } else {
    //   this.enableNext = false;
    // }
  }

  nextStep() {
    const athlete: Athlete = {
      ...this.medicalInformationForm.value
    };
    this.informationEntered.emit(athlete);
  }
}
