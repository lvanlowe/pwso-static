import { Component, OnInit } from '@angular/core';
import { Sport } from 'src/app/models/sport';

@Component({
  selector: 'app-sport-picker',
  templateUrl: './sport-picker.component.html',
  styleUrls: ['./sport-picker.component.scss']
})
export class SportPickerComponent implements OnInit {

  constructor() { }

    public sportList: Array<Sport>;
    public instruction: string;
    selectedValue: number;

  ngOnInit() {

    this.instruction = 'Select a sport for registration';
    this.sportList =[
      { id: 1 , name: 'Bowling', canRegister: false, hasUniform: false, isTeamSport: false},
      { id: 2 , name: 'Soccer', canRegister: true, hasUniform: true, isTeamSport: true},
      { id: 3 , name: 'Bocce', canRegister: true, hasUniform: false, isTeamSport: false},
      { id: 4 , name: 'Basketball', canRegister: false, hasUniform: true, isTeamSport: true},
      { id: 5 , name: 'Floor Hockey', canRegister: false, hasUniform: true, isTeamSport: true},
    ];

    // this.selectedValue = 2;
  }

  public selectionChange(value: any): void {
    console.log('selectionChange', value);
}

}
