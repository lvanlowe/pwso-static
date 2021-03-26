import { Component, OnInit } from '@angular/core';
import { LoadAll } from '@briebug/ngrx-auto-entity';
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

}
