import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Load, LoadAll, SelectByKey } from '@briebug/ngrx-auto-entity';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Athlete } from 'src/app/models/athlete';
import { AppState } from 'src/app/state/app.state';
import { allAthletes, loadedAthlete, loadingAthlete } from 'src/app/state/athlete.state';

@Component({
  selector: 'app-athlete-list',
  templateUrl: './athlete-list.component.html',
  styleUrls: ['./athlete-list.component.scss']
})
export class AthleteListComponent implements OnInit {

  @Output() editAthleteItem = new EventEmitter();
  @Output() editParentItem = new EventEmitter();
  @Output() editFormItem = new EventEmitter();
  isLoadingAthlete: boolean;
  view: Observable<Athlete[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.pipe(select(loadedAthlete)).subscribe(loaded => {
      if (!loaded) {
        this.store.dispatch(new LoadAll(Athlete));
      }
    });

    this.store.pipe(select(loadingAthlete))
      .subscribe(loading => {
        this.isLoadingAthlete = loading;
        this.view = this.store.pipe(select(allAthletes));
      });
  }

  showAthleteScreen(dataItem){
    this.store.dispatch(new Load(Athlete, dataItem.id, dataItem.lastName));
    this.editAthleteItem.emit(dataItem.id);
  }

  showParentScreen(dataItem){
    this.store.dispatch(new Load(Athlete, dataItem.id, dataItem.lastName));
    this.editParentItem.emit(dataItem.id);
  }

  showFormScreen(dataItem){
    console.log(dataItem);
    this.store.dispatch(new Load(Athlete, dataItem.id, dataItem.lastName));
    this.editFormItem.emit(dataItem.id);
  }
}
