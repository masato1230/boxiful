import { Instruction } from '../../components/Training/Instructions';
import { ActionTypes } from '../action-types';
import { Action } from '../actions';
import Menu from '../menu';

interface TrainingState {
  menu: Menu;
  instructions: Instruction[];
  scores: number[];
}

const initialState: TrainingState = {
  menu: {
    title: 'Nothing',
    timeLimit: 0,
    numOfInstructions: 0,
  },
  instructions: [],
  scores: [],
};

const reducer = (state: TrainingState = initialState, action: Action): TrainingState => {
  switch (action.type) {
    case ActionTypes.SET_MENU:
      return { ...state, menu: action.payload };
    case ActionTypes.SET_INSTRUCTIONS:
      return { ...state, instructions: action.payload };
    case ActionTypes.PUSH_SCORE:
      let newScores = state.scores;
      newScores.push(action.payload)
      return { ...state, scores: newScores };
    default:
      return state;
  }
};

export default reducer;