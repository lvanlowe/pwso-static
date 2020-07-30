import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Sport } from 'src/app/models/sport';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Program } from 'src/app/models/program';
import { collectExternalReferences } from '@angular/compiler';
import { Observable } from 'rxjs';
import { allSports, availableSports } from 'src/app/state/sport.state';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { SelectByKey, Deselect } from '@briebug/ngrx-auto-entity';
import { availablePrograms, allPrograms, availableProgramsCount } from 'src/app/state/program.state';


@Component({
  selector: 'app-sport-picker',
  templateUrl: './sport-picker.component.html',
  styleUrls: ['./sport-picker.component.scss']
})
export class SportPickerComponent implements OnInit {

  @Output() sportSelected = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }

    sportList$: Observable<Sport[]>;
    programList: Array<Program>;
    programList$: Observable<Program[]>;
    instruction: string;
    selectedProgram: Program;
    selectedSport: Sport;
    sportPickerForm: FormGroup;
    canContinue: boolean;
    showProgram = false;
    canCancel = false;
    sportName: any;
    programName: any;


  ngOnInit() {

    this.instruction = 'Select a sport for registration';

    this.programList = [
      {id: 1, name: 'Woodbrige', sportid: 4 },
      {id: 2, name: 'Gainesville', sportid: 4 },
    ]

    this.sportList$ = this.store.pipe(select(availableSports));
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
    this.programName = this.sportPickerForm.get('program');
  }

  public selectionSport(value: Sport): void {
    // console.log('selectionChange', value);
    // console.log(this.selectedSport);
    this.sportName.setValue(value);
    this.store.dispatch(new SelectByKey(Sport, value.id ));
    this.programList$  = this.store.pipe(select(availablePrograms));
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
    let count: number;
    this.store.pipe(select(availableProgramsCount))
    .subscribe(data => count = data);
    return count;
  }

  private setUpForProgramSelection() {
    this.instruction = 'Select a Program / Location';
    this.selectedProgram = null;
    this.showProgram = true;
  }

  public setProgram(){
    this.programList$.subscribe(programs => this.selectedProgram = programs[0]);
    console.log('one program');
    console.log(this.selectedProgram);
    this.programName.setValue(this.selectedProgram.id);
    this.store.dispatch(new SelectByKey(Program, this.selectedProgram.id) );
    this.showProgram = false;
  }

  public selectionProgram(value: Program): void {
    console.log('selectionChange', value);
    console.log(this.selectedProgram);
    this.store.dispatch(new SelectByKey(Program, value.id ));
    this.programName.setValue(value);
    console.log(this.programName.value);
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
    this.selectedProgram = null;
    this.canContinue = false;
    this.canCancel = false;
    this.sportName.setValue(null);
    this.programName.setValue(null);
    this.store.dispatch(new Deselect(Program));
    this.store.dispatch(new Deselect(Sport));
    this.instruction = 'Select a sport for registration';
    this.sportSelected.emit(this.canContinue);
  }

}
