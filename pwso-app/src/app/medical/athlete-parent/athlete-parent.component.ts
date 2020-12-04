import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-athlete-parent',
  templateUrl: './athlete-parent.component.html',
  styleUrls: ['./athlete-parent.component.scss']
})
export class AthleteParentComponent implements OnInit {

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

}
