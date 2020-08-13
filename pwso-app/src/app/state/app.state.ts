import { IEntityState } from '@briebug/ngrx-auto-entity';
import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { userInfoReducer } from './user-info.state';
import { UserInfo } from '../models/user-info';
import { Sport } from '../models/sport';
import { sportReducer } from './sport.state';
import { Program } from '../models/program';
import { programReducer } from './program.state';
import { Registrant } from '../models/registrant';
import { registrantReducer } from './registrant.state';
// import { Deacon } from '../models/deacon';
// import { deaconReducer } from './deacon.state';


export interface IAppState {
    userInfo: IEntityState<UserInfo>;
    sport: IEntityState<Sport>;
    program: IEntityState<Program>;
    registrant: IEntityState<Registrant>;
}

export type AppState = IAppState;

export const appReducer: ActionReducerMap<AppState> = {
    userInfo: userInfoReducer,
    sport: sportReducer,
    program: programReducer,
    registrant: registrantReducer
};

export const appMetaReducers: MetaReducer<AppState>[] = [debug];

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  console.log('reducer', reducer);
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}
