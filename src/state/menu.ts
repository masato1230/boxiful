import {
  Instruction,
  LeftHandLeftPunch,
  LeftHandRightPunch,
  RightHandLeftPunch,
  RightHandRightPunch,
} from '../components/Training/Instructions';

export default interface Menu {
  title: string;
  timeLimit: number;
  numOfInstructions: number;
  instructionTypes: Instruction[];
}

export const createInstructionsFromMenu = (menu: Menu) => {
  const instructions: Instruction[] = [];
  for (let i = 0; i < menu.numOfInstructions; i++) {
    instructions.push(
      menu.instructionTypes[
        Math.floor(Math.random() * menu.instructionTypes.length)
      ]
    );
  }
  return instructions;
};

export const EasyMenu: Menu = {
  title: 'Easy Menu',
  timeLimit: 1000,
  numOfInstructions: 30,
  instructionTypes: [
    LeftHandLeftPunch,
    LeftHandRightPunch,
    RightHandLeftPunch,
    RightHandRightPunch,
  ],
};
