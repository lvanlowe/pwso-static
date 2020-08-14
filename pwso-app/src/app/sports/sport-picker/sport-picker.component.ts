import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Sport } from 'src/app/models/sport';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Program } from 'src/app/models/program';
import { Observable } from 'rxjs';
import { availableSports, loadedSport, loadingSport } from 'src/app/state/sport.state';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { SelectByKey, Deselect, LoadAll } from '@briebug/ngrx-auto-entity';
import { availablePrograms, availableProgramsCount, loadedProgram, loadingProgram } from 'src/app/state/program.state';


@Component({
  selector: 'app-sport-picker',
  templateUrl: './sport-picker.component.html',
  styleUrls: ['./sport-picker.component.scss']
})
export class SportPickerComponent implements OnInit {

  @Output() sportSelected = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }

    sportList$: Observable<Sport[]>;
    programList$: Observable<Program[]>;
    instruction: string;
    selectedProgram: Program;
    selectedSport: Sport;
    sportPickerForm: FormGroup;
    canContinue: boolean;
    showProgram = false;
    canCancel = false;
    isLoadingSport = false;
    isLoadingProgram = false;


  ngOnInit() {

    this.instruction = 'Select a sport for registration';
    this.sportList$ = this.store.pipe(select(availableSports));
    this.buildPickerForm(this.formBuilder);
    this.store.pipe(select(loadedSport)).subscribe(loaded => {
      if (!loaded) {
        this.store.dispatch(new LoadAll(Sport));
      }
    });
    this.store.pipe(select(loadedProgram)).subscribe(loaded => {
      if (!loaded) {
        this.store.dispatch(new LoadAll(Program));
      }
    });
    this.store.pipe(select(loadingSport))
      .subscribe(loading => {this.isLoadingSport = loading; });
    this.store.pipe(select(loadingProgram))
      .subscribe(loading => {this.isLoadingProgram = loading; });
  }

  buildPickerForm(formBuilder: FormBuilder) {
    this.sportPickerForm = formBuilder.group(
      {
        sport: new FormControl(null, Validators.required),
        program: new FormControl(null, Validators.required),
      }
    );
  }

  public selectionSport(value: Sport): void {
    this.sportPickerForm.controls.sport.setValue(value);
    this.store.dispatch(new SelectByKey(Sport, value.id ));
    this.programList$  = this.store.pipe(select(availablePrograms));
    this.canCancel = true;
    if (this.getProgramsForSport(value.id) !== 1) {
      this.setUpForProgramSelection();
    } else {
      this.setProgram();
    }
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
    this.sportPickerForm.controls.program.setValue(this.selectedProgram);
    this.store.dispatch(new SelectByKey(Program, this.selectedProgram.id) );
    this.showProgram = false;
  }

  public selectionProgram(value: Program): void {
    this.store.dispatch(new SelectByKey(Program, value.id ));
    this.sportPickerForm.controls.program.setValue(value);
    this.enableContinueButton();
  }

  enableContinueButton() {
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
    this.instruction = 'Press "Continue" button to continue registraion';
  }

  public disableControls() {
    this.sportPickerForm.controls.sport.disable();
    this.sportPickerForm.controls.program.disable();
  }

  public enableControls() {
    this.sportPickerForm.controls.sport.enable();
    this.sportPickerForm.controls.program.enable();
  }

  public  clickCancel() {
    this.enableControls();
    this.showProgram = false;
    this.selectedSport = null;
    this.selectedProgram = null;
    this.canContinue = false;
    this.canCancel = false;
    this.sportPickerForm.controls.sport.setValue(null);
    this.sportPickerForm.controls.program.setValue(null);
    this.store.dispatch(new Deselect(Program));
    this.store.dispatch(new Deselect(Sport));
    this.instruction = 'Select a sport for registration';
    this.sportSelected.emit(this.canContinue);
  }

}
