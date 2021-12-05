import SeriesMenu, { testSeriesMenu } from '../../models/menu/SeriesMenu';
import { SeriesTrainingActionTypes } from '../action-types/seriesTrainingActionTypes';
import { SeriesTrainingAction } from '../actions';

interface SeriesTrainingState {
  seriesMenu: SeriesMenu;
  menuIndex: number;
  seriesTrainingScores: number[];
}

const initialState: SeriesTrainingState = {
  seriesMenu: testSeriesMenu,
  menuIndex: 0,
  seriesTrainingScores: [],
};

const seriesTrainingReducer = (state: SeriesTrainingState = initialState, action: SeriesTrainingAction): SeriesTrainingState => {
  switch (action.type) {
    case SeriesTrainingActionTypes.SET_SERIES_MENU:
      return { ...state, seriesMenu: action.payload };
    case SeriesTrainingActionTypes.SET_MENU_INDEX:
      return { ...state, menuIndex: action.payload }
    case SeriesTrainingActionTypes.PUSH_SCORE:
      let newScores = state.seriesTrainingScores;
      newScores.push(action.payload);
      return { ...state, seriesTrainingScores: newScores };
    default:
      return state;
  }
}

export default seriesTrainingReducer;
