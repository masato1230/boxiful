import SeriesMenu from '../../models/menu/SeriesMenu';
import { SeriesTrainingActionTypes } from '../action-types/seriesTrainingActionTypes';

export interface SetSeriesMenu {
  type: SeriesTrainingActionTypes.SET_SERIES_MENU;
  payload: SeriesMenu;
}

export interface SetMenuIndex {
  type: SeriesTrainingActionTypes.SET_MENU_INDEX;
  payload: number;
}

export interface PushScore {
  type: SeriesTrainingActionTypes.PUSH_SCORE;
  payload: number;
}

export type SeriesTrainingAction = SetSeriesMenu | SetMenuIndex | PushScore;
