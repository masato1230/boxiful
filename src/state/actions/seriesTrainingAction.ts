import Menu from '../../models/menu';
import { SeriesTrainingActionTypes } from '../action-types/seriesTrainingActionTypes';

export interface SetMSeriesMenu {
  type: SeriesTrainingActionTypes.SET_SERIES_MENU;
  payload: Menu;
}

export interface SetMenuIndex {
  type: SeriesTrainingActionTypes.SET_MENU_INDEX;
  payload: number;
}
