// tslint:disable-next-line: max-line-length
import { buildState, IEntityState, ofEntityType, EntityActionTypes, CreateSuccess, SelectByKey, CreateFailure } from '@briebug/ngrx-auto-entity';
import { Action, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createEffect, Actions } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { AppState } from './app.state';
import { Athlete } from '../models/athlete';

export const { initialState, selectors} = buildState(Athlete);

export const {
  selectIsSaving: savingAthlete,
  selectCurrentEntity: currentAthlete,
} = selectors;

export function athleteReducer(state = initialState): IEntityState<Athlete> {
  return state;
}

@Injectable()
export class AthleteEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>
  ) {}

  athleteCreateSuccess$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofEntityType(Athlete, EntityActionTypes.CreateSuccess),
        tap((success: CreateSuccess<Athlete>) => {
          this.store.dispatch(new SelectByKey(Athlete, success.entity.id));
        })
      ),
    { dispatch: false }
  );

  athleteCreateFailure$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofEntityType(Athlete, EntityActionTypes.CreateFailure),
        tap((failure: CreateFailure<Athlete>) => {
          alert('ERROR: A fatal error has occured, try again later')
        })
      ),
    { dispatch: false }
  );
}
