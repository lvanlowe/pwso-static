import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Sport } from 'src/app/models/sport';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-sport-picker',
  templateUrl: './sport-picker.component.html',
  styleUrls: ['./sport-picker.component.scss']
})
export class SportPickerComponent implements OnInit {

  @Output() sportSelected = new EventEmitter();

  constructor(private formBuilder: FormBuilder) { }

    sportList: Array<Sport>;
    instruction: string;
    selectedValue: number;
    sportPickerForm: FormGroup;
    canContinue: boolean;


  ngOnInit() {

    this.instruction = 'Select a sport for registration';

    this.sportList = [
      { id: 1 , name: 'Bowling', canRegister: false, hasUniform: false, isTeamSport: false},
      { id: 2 , name: 'Soccer', canRegister: true, hasUniform: true, isTeamSport: true},
      { id: 3 , name: 'Bocce', canRegister: true, hasUniform: false, isTeamSport: false},
      { id: 4 , name: 'Basketball', canRegister: false, hasUniform: true, isTeamSport: true},
      { id: 5 , name: 'Floor Hockey', canRegister: false, hasUniform: true, isTeamSport: true},
    ];

    this.buildPickerForm(this.formBuilder);
    console.log(this.sportPickerForm.valid);
    this.sportPickerForm.valueChanges.subscribe(value => this.enableContinueButton);
    // this.selectedValue = 2;
  }

  buildPickerForm(formBuilder: FormBuilder) {
    this.sportPickerForm = formBuilder.group(
      {
        name: [null, [Validators.required]]
      }
    );

  }

  public selectionChange(value: any): void {
    console.log('selectionChange', value);
    this.instruction = 'Press "Continue" button to continue registraion';
    const sportName = this.sportPickerForm.get('name');
    sportName.setValue(value);
    console.log(sportName.value);
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
  }
}
