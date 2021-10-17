import { combineReducers } from 'redux';
import trainingReducer from './trainingReducer';

const reducers = combineReducers({
  training: trainingReducer,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
