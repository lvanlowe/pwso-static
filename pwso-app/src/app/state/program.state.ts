import { buildState, IEntityState, EntityAction, EntityActions } from '@briebug/ngrx-auto-entity';
import { Program } from '../models/program';

export const { initialState, selectors} = buildState(Program);

export const {
  selectAll: allProgram
} = selectors;

export function programReducer(state = initialState): IEntityState<Program> {
  return state;
}
