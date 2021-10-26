import { Instruction } from '../../components/Training/Instructions';
import { ActionTypes } from '../action-types';
import Menu from '../menu';

export interface SetMenuAction {
  type: ActionTypes.SET_MENU;
  payload: Menu;
}

export interface SetInstructionsAction {
  type: ActionTypes.SET_INSTRUCTIONS;
  payload: Instruction[];
}

export interface PushScoreAction {
  type: ActionTypes.PUSH_SCORE;
  payload: number;
}

export interface ResetScoresAction {
  type: ActionTypes.RESET_SCORES;
}

export type Action = SetMenuAction | SetInstructionsAction | PushScoreAction | ResetScoresAction;
