import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-medical-dashborad',
  templateUrl: './medical-dashborad.component.html',
  styleUrls: ['./medical-dashborad.component.scss']
})
export class MedicalDashboradComponent implements OnInit {

  medicalDashboardForm: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
