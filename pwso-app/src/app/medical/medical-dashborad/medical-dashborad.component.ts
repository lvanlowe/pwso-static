import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-medical-dashborad',
  templateUrl: './medical-dashborad.component.html',
  styleUrls: ['./medical-dashborad.component.scss']
})
export class MedicalDashboradComponent implements OnInit {

  medicalDashboardForm: FormGroup;
  displayList: boolean;
  canAdd: boolean;
  canCancel: boolean;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildMedicalForm(this.formBuilder);
    this.medicalDashboardForm.markAsPristine();
    this.displayList = true
    this.canAdd = true;
  }

  buildMedicalForm(formBuilder: FormBuilder) {
    this.medicalDashboardForm = formBuilder.group(
      {

      }
    );
  }

  clickAdd() {
    this.canCancel = true;
    this.displayList = false;
    this.canAdd = false;
    // this.diaconateid = null;
  }

  clickCancel() {
    this.canAdd = true;
    this.displayList = true;
  }
}
