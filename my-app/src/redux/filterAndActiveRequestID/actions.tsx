export const SET_ACTIVE_REQUEST_ID = 'SET_ACTIVE_REQUEST_ID';
export const SET_MIN_LENGHT_FILTER = 'SET_MIN_LENGHT_FILTER';

export const setActiveRequestID = (activeRequestID: number) => ({
  type: SET_ACTIVE_REQUEST_ID,
  payload: activeRequestID,
});

export const setMinLenghtFilter = (minLenght: string | '') => ({
  type: SET_MIN_LENGHT_FILTER,
  payload: minLenght,
});