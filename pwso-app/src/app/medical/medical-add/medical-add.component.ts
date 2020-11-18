import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medical-add',
  templateUrl: './medical-add.component.html',
  styleUrls: ['./medical-add.component.scss']
})
export class MedicalAddComponent implements OnInit {

  uploadSaveUrl = `http://localhost:7071/api/UploadMedicalFunc1`; // should represent an actual API endpoint


  // uploadSaveUrl = `http://localhost:7071/api/medical`; // should represent an actual API endpoint
  constructor() { }

  ngOnInit() {
  }

}
