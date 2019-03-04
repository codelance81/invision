import SET_HISTORICAL_DATA from './types';

const historicalDataAction = data => ({
  type: SET_HISTORICAL_DATA,
  data,
});

export default historicalDataAction;
