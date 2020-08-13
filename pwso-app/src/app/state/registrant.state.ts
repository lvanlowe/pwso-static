import { buildState, IEntityState, EntityAction, EntityActions } from '@briebug/ngrx-auto-entity';
import { Program } from '../models/program';
import { createSelector } from '@ngrx/store';
import { currentSportid } from './sport.state';
import { Registrant } from '../models/registrant';

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
