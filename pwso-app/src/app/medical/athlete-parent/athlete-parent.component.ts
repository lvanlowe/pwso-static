import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Athlete } from 'src/app/models/athlete';

@Component({
  selector: 'app-athlete-parent',
  templateUrl: './athlete-parent.component.html',
  styleUrls: ['./athlete-parent.component.scss']
})
export class AthleteParentComponent implements OnInit {

  @Output() informationEntered = new EventEmitter();

  public mask = '(000) 000-0000';
  athleteParentForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildAthleteParentForm(this.formBuilder);
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

  nextStep() {
    const athlete: Athlete = {
      ...this.athleteParentForm.value
    };
    this.informationEntered.emit(athlete);
  }
}
