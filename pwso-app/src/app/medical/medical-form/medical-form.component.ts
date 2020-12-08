import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-medical-form',
  templateUrl: './medical-form.component.html',
  styleUrls: ['./medical-form.component.scss']
})
export class MedicalFormComponent implements OnInit {

  uploadSaveUrl = `http://localhost:7071/api/UploadMedicalFunc`; // should represent an actual API endpoint
  medicalUploadForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.buildMedicalUploadForm(this.formBuilder);
    // this.medicalUploadForm.valueChanges.subscribe(value => this.enableNextButton);
  }

  buildMedicalUploadForm(formBuilder: FormBuilder) {
    this.medicalUploadForm = formBuilder.group(
      {
        medicalForm: new FormControl(),
      }
    );
  }
}
