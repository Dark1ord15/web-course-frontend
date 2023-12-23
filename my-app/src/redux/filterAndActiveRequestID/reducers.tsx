// reducers.ts

import { combineReducers, AnyAction } from 'redux';
import {
  SET_ACTIVE_REQUEST_ID,
  SET_MIN_LENGHT_FILTER,
  
} from './actions';

const activeRequestIDReducer = (state: number | null = null, action: AnyAction) => {
  switch (action.type) {
    case SET_ACTIVE_REQUEST_ID:
      return action.payload;
    default:
      return state;
  }
};

const minLenghtFilterReducer = (state: string | '' = '', action: AnyAction) => {
  switch (action.type) {
    case SET_MIN_LENGHT_FILTER:
      return action.payload;
    default:
      return state;
  }
};

export const filterAndActiveIdReducer = combineReducers({
  activeRequestID: activeRequestIDReducer,
  minLenghtFilter: minLenghtFilterReducer,
});