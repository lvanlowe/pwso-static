import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MedicalParts } from 'src/app/models/medical-parts.enum';

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
  athleteid: string;
  medicalScreen: number;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildMedicalForm(this.formBuilder);
    this.medicalDashboardForm.markAsPristine();
    this.displayList = true;
    this.medicalScreen = MedicalParts.List;
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
    this.athleteid = null;
    this.medicalScreen = MedicalParts.Add;
  }

  clickCancel() {
    this.canAdd = true;
    this.displayList = true;
    this.medicalScreen = MedicalParts.List;
  }

  showAthlete(id: string){
    this.canCancel = true;
    this.displayList = false;
    this.canAdd = false;
    this.athleteid = id;
    this.medicalScreen = MedicalParts.EditAthlete
  }

  showParent(id: string){
    this.canCancel = true;
    this.displayList = false;
    this.canAdd = false;
    this.athleteid = id;
    this.medicalScreen = MedicalParts.EditParent;
  }

  showForm(id: string){
    this.canCancel = true;
    this.displayList = false;
    this.canAdd = false;
    this.athleteid = id;
    this.medicalScreen = MedicalParts.UpdateForm;
  }
}
