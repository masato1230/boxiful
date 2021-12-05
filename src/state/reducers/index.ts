import { combineReducers } from 'redux';
import trainingReducer from './trainingReducer';
import seriesTrainingReducer from './seriesTrainingReducer';

const reducers = combineReducers({
  training: trainingReducer,
  seriesTraining: seriesTrainingReducer,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
