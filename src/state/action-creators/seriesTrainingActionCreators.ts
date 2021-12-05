import SeriesMenu from '../../models/menu/SeriesMenu';
import { SeriesTrainingActionTypes } from '../action-types/seriesTrainingActionTypes';
import { PushScore, SetMenuIndex, SetSeriesMenu } from '../actions';

export const setSeriesMenu = (seriesMenu: SeriesMenu): SetSeriesMenu => {
  return {
    type: SeriesTrainingActionTypes.SET_SERIES_MENU,
    payload: seriesMenu,
  };
};

export const setMenuIndex = (menuIndex: number): SetMenuIndex => {
  return {
    type: SeriesTrainingActionTypes.SET_MENU_INDEX,
    payload: menuIndex,
  };
};

export const pushSeriesScore = (score: number): PushScore => {
  return {
    type: SeriesTrainingActionTypes.PUSH_SCORE,
    payload: score,
  };
};
