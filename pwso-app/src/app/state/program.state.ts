import { buildState, IEntityState, EntityAction, EntityActions } from '@briebug/ngrx-auto-entity';
import { Program } from '../models/program';
import { createSelector } from '@ngrx/store';
import { currentSportid } from './sport.state';

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
