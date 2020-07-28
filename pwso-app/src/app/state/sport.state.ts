import { buildState, IEntityState, EntityAction, EntityActions } from '@briebug/ngrx-auto-entity';
import { Sport } from '../models/sport';

export const { initialState, selectors} = buildState(Sport);

export const {
  selectAll: allSports
} = selectors;

export function sportReducer(state = initialState): IEntityState<Sport> {
  return state;
}
