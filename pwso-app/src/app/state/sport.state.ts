import { buildState, IEntityState, EntityAction, EntityActions } from '@briebug/ngrx-auto-entity';
import { Sport } from '../models/sport';
import { createSelector } from '@ngrx/store';

export const { initialState, selectors} = buildState(Sport);

export const {
  selectAll: allSports,
  selectCurrentEntityKey: currentSportid
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
