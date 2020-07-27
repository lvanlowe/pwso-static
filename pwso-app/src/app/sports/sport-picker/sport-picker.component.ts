import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Sport } from 'src/app/models/sport';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Program } from 'src/app/models/program';
import { collectExternalReferences } from '@angular/compiler';


@Component({
  selector: 'app-sport-picker',
  templateUrl: './sport-picker.component.html',
  styleUrls: ['./sport-picker.component.scss']
})
export class SportPickerComponent implements OnInit {

  @Output() sportSelected = new EventEmitter();

  constructor(private formBuilder: FormBuilder) { }

    sportList: Array<Sport>;
    programList: Array<Program>;
    instruction: string;
    selectedProgram: Program;
    selectedSport: Sport;
    sportPickerForm: FormGroup;
    canContinue: boolean;
    showProgram = false;
    canCancel = false;
    sportName: any;


  ngOnInit() {

    this.instruction = 'Select a sport for registration';

    this.sportList = [
      { id: 1 , name: 'Bowling', canRegister: false, hasUniform: false, isTeamSport: false},
      { id: 2 , name: 'Soccer', canRegister: true, hasUniform: true, isTeamSport: true},
      { id: 3 , name: 'Bocce', canRegister: true, hasUniform: false, isTeamSport: false},
      { id: 4 , name: 'Basketball', canRegister: false, hasUniform: true, isTeamSport: true},
      { id: 5 , name: 'Floor Hockey', canRegister: false, hasUniform: true, isTeamSport: true},
    ];

    this.programList = [
      {id: 1, name: 'Woodbrige', sportid: 4 },
      {id: 2, name: 'Gainesville', sportid: 4 },
    ]

    this.buildPickerForm(this.formBuilder);
    console.log(this.sportPickerForm.valid);
    this.sportPickerForm.valueChanges.subscribe(value => this.enableContinueButton);
    // this.selectedValue = 2;
  }

  buildPickerForm(formBuilder: FormBuilder) {
    this.sportPickerForm = formBuilder.group(
      {
        sport: [null, [Validators.required]],
        program: [null, [Validators.required]]
      }
    );

    this.sportName = this.sportPickerForm.get('sport');

  }

  public selectionSport(value: Sport): void {
    // console.log('selectionChange', value);
    // console.log(this.selectedSport);
    this.sportName.setValue(value);
    this.canCancel = true;
    if (this.getProgramsForSport(value.id) !== 1) {
      console.log('show program');
      this.setUpForProgramSelection();
    } else {
      console.log('not show program');
      this.setProgram();
    }

    // console.log(this.sportName.value);
    // console.log(this.sportPickerForm.valid);
    this.enableContinueButton();
  }

  public getProgramsForSport(value: number): number {
    return this.programList.length;
  }

  private setUpForProgramSelection() {
    this.instruction = 'Select a Program / Location';
    this.selectedProgram = null;
    this.showProgram = true;
  }

  public setProgram(){
    this.selectedProgram = this.programList[0];
    this.showProgram = false;
  }

  public selectionProgram(value: any): void {
    console.log('selectionChange', value);
    console.log(this.selectedProgram);
    const programName = this.sportPickerForm.get('program');
    programName.setValue(value);
    console.log(programName.value);
    console.log(this.sportPickerForm.valid);
    this.enableContinueButton();
  }

  enableContinueButton() {
    console.log(this.sportPickerForm.valid);

    if (this.sportPickerForm.valid  && !this.sportPickerForm.errors) {
      this.instruction = 'Press "Continue" button to continue registraion';
      this.canContinue = true;
    } else {
      this.canContinue = false;
    }
  }

  clickContinue() {
    this.sportSelected.emit(this.canContinue);
    this.disableControls();
    this.canContinue = false;
  }

  public disableControls() {
    this.sportPickerForm.controls['sport'].disable();
    this.sportPickerForm.controls['program'].disable();
  }

  public enableControls() {
    this.sportPickerForm.controls['sport'].enable();
    this.sportPickerForm.controls['program'].enable();
  }

  public  clickCancel() {
    this.enableControls();
    this.showProgram = false;
    this.selectedSport = null;
    this.canContinue = false;
    this.canCancel = false;
    this.sportName.setValue(null);
    this.sportSelected.emit(this.canContinue);
  }

}
