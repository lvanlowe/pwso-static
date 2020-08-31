import { buildState, IEntityState, EntityAction, EntityActions, ofEntityType, EntityActionTypes, LoadAllFailure } from '@briebug/ngrx-auto-entity';
import { Program } from '../models/program';
import { createSelector, Store, Action } from '@ngrx/store';
import { currentSportid } from './sport.state';
import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { AppState } from './app.state';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export const { initialState, selectors} = buildState(Program);

export const {
  selectAll: allPrograms,
  selectLoadedAt: loadedProgram,
  selectIsLoading: loadingProgram,
  selectCurrentEntity: currentProgram,
} = selectors;

export function programReducer(state = initialState): IEntityState<Program> {
  return state;
}

export const availablePrograms = createSelector(
  allPrograms,
  currentSportid,
  (programs, id) => {
    return programs.filter(p => p.sportid === id);
  }
);

export const availableProgramsCount = createSelector(
  allPrograms,
  currentSportid,
  (programs, id) => {
    return programs.filter(p => p.sportid === id).length;
  }
);

@Injectable()
export class ProgramEffects {
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

  programLoadFailure$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofEntityType(Program, EntityActionTypes.LoadAllFailure),
        tap((failure: LoadAllFailure<Program>) => {
          alert('ERROR: A fatal error has occured, try again later')
        })
      ),
    { dispatch: false }
  )
}
