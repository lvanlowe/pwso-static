import { buildState, IEntityState, EntityAction, EntityActions, ofEntityType, EntityActionTypes, LoadAllFailure } from '@briebug/ngrx-auto-entity';
import { Sport } from '../models/sport';
import { createSelector, Store, Action } from '@ngrx/store';
import { Actions, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AppState } from './app.state';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export const { initialState, selectors} = buildState(Sport);

export const {
  selectAll: allSports,
  selectCurrentEntityKey: currentSportid,
  selectCurrentEntity: currentSport,
  selectLoadedAt: loadedSport,
  selectIsLoading: loadingSport,
} = selectors;

export function sportReducer(state = initialState): IEntityState<Sport> {
  return state;
}

export const availableSports = createSelector(
  allSports,
  (sports) => {
    return sports.filter(s => s.canRegister === true);
  }
);

export const currentSportHasUniforms = createSelector(
  currentSport,
  (sport) => {
    if (sport) {
    return sport.hasUniform;
  } else {
      return false;
    }
  }
);

@Injectable()
export class SportEffects {
  constructor(
    private actions$: Actions,
    // private uiService: UIService,
    private store: Store<AppState>
  ) {}

  // fundingRequestNoticeReplaceSuccess$: Observable<Action> = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofEntityType(FundingRequestNotice, EntityActionTypes.ReplaceSuccess),

  //       tap(() =>
  //         this.uiService.showSuccessToast('Funding Request Notice has been saved.')
  //       )
  //     ),

  //   { dispatch: false }
  // )

  // registrantCreateSuccess$: Observable<Action> = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofEntityType(Registrant, EntityActionTypes.CreateSuccess),
  //       tap((success: CreateSuccess<Registrant>) => {
  //         this.store.dispatch(new SelectByKey(Registrant, success.entity.id));
  //       })
  //     ),
  //   { dispatch: false }
  // );

  sportLoadFailure$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofEntityType(Sport, EntityActionTypes.LoadAllFailure),
        tap((failure: LoadAllFailure<Sport>) => {
          alert('ERROR: A fatal error has occured, try again later')
        })
      ),
    { dispatch: false }
  )
}
