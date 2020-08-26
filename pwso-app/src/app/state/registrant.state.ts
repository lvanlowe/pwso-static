import { buildState, IEntityState, EntityAction, EntityActions, ofEntityType, EntityActionTypes, CreateSuccess, SelectByKey } from '@briebug/ngrx-auto-entity';
import { Program } from '../models/program';
import { createSelector, Action, Store } from '@ngrx/store';
import { currentSportid } from './sport.state';
import { Registrant } from '../models/registrant';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createEffect, Actions } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { AppState } from './app.state';

export const { initialState, selectors} = buildState(Registrant);

export const {
  selectIsSaving: savingRegistrant,
} = selectors;

export function registrantReducer(state = initialState): IEntityState<Registrant> {
  return state;
}

// export const availablePrograms = createSelector(
//   allPrograms,
//   currentSportid,
//   (programs, id) => {
//     return programs.filter(p => p.sportid === id);
//   }
// );

// export const availableProgramsCount = createSelector(
//   allPrograms,
//   currentSportid,
//   (programs, id) => {
//     return programs.filter(p => p.sportid === id).length;
//   }
// );

@Injectable()
export class RegistrantEffects {
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

  registrantCreateSuccess$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofEntityType(Registrant, EntityActionTypes.CreateSuccess),
        tap((success: CreateSuccess<Registrant>) => {
          this.store.dispatch(new SelectByKey(Registrant, success.entity.id));
        })
      ),
    { dispatch: false }
  );

  // fundingRequestNoticeReplaceFailure$: Observable<Action> = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofEntityType(FundingRequestNotice, EntityActionTypes.ReplaceFailure),
  //       tap((failure: ReplaceFailure<FundingRequestNotice>) => {
  //         this.uiService.handleError(failure.error)
  //       })
  //     ),
  //   { dispatch: false }
  // )
}
