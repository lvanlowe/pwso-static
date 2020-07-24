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

  }

  public selectionSport(value: any): void {
    console.log('selectionChange', value);
    console.log(this.selectedSport);
    this.instruction = 'Select a Program / Location';
    const sportName = this.sportPickerForm.get('sport');
    sportName.setValue(value);
    this.selectedProgram = null;
    this.showProgram = true;
    console.log(sportName.value);
    console.log(this.sportPickerForm.valid);
    this.enableContinueButton();
  }

  public selectionProgram(value: any): void {
    console.log('selectionChange', value);
    console.log(this.selectedProgram);
    this.instruction = 'Press "Continue" button to continue registraion';
    const programName = this.sportPickerForm.get('program');
    programName.setValue(value);
    console.log(programName.value);
    console.log(this.sportPickerForm.valid);
    this.enableContinueButton();
  }

  enableContinueButton() {
    console.log(this.sportPickerForm.valid);

    if (this.sportPickerForm.valid  && !this.sportPickerForm.errors) {
      this.canContinue = true;
    } else {
      this.canContinue = false;
    }
  }

  clickContinue(){
    this.sportSelected.emit(this.canContinue);
    this.sportPickerForm.controls['sport'].disable();
    this.sportPickerForm.controls['program'].disable();
    this.canContinue = false;
  }
}
