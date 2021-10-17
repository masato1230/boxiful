import { Instruction } from '../../components/Training/Instructions';
import { ActionTypes } from '../action-types';
import {
  SetMenuAction,
  SetInstructionsAction,
  PushScoreAction,
} from '../actions';
import Menu from '../menu';

export const setMenu = (menu: Menu): SetMenuAction => {
  return {
    type: ActionTypes.SET_MENU,
    payload: menu,
  };
};

export const setInstructions = (
  instructions: Instruction[]
): SetInstructionsAction => {
  return {
    type: ActionTypes.SET_INSTRUCTIONS,
    payload: instructions,
  };
};

export const pushScore = (score: number): PushScoreAction => {
  return {
    type: ActionTypes.PUSH_SCORE,
    payload: score,
  };
};
