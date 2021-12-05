import SeriesMenu, { testSeriesMenu } from '../../models/menu/SeriesMenu';
import { SeriesTrainingActionTypes } from '../action-types/seriesTrainingActionTypes';
import { SeriesTrainingAction } from '../actions';

interface SeriesTrainingState {
  seriesMenu: SeriesMenu;
  menuIndex: number;
  scores: number[];
}

const initialState: SeriesTrainingState = {
  seriesMenu: testSeriesMenu,
  menuIndex: 0,
  scores: [],
};

const seriesTrainingReducer = (state: SeriesTrainingState = initialState, action: SeriesTrainingAction): SeriesTrainingState => {
  switch (action.type) {
    case SeriesTrainingActionTypes.SET_SERIES_MENU:
      return { ...state, seriesMenu: action.payload };
    case SeriesTrainingActionTypes.SET_MENU_INDEX:
      return { ...state, menuIndex: action.payload }
    case SeriesTrainingActionTypes.PUSH_SCORE:
      let newScores = state.scores;
      newScores.push(action.payload);
      return { ...state, scores: newScores };
    default:
      return state;
  }
}

export default seriesTrainingReducer;
