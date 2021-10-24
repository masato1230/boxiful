import {
  Instruction,
  LeftHandLeftPunch,
  LeftHandRightPunch,
  LeftLegLeftKick,
  LeftLegRightKick,
  RightHandLeftPunch,
  RightHandRightPunch,
  RightLegLeftKick,
  RightLegRightKick,
} from '../components/Training/Instructions';

export default interface Menu {
  title: string;
  description: string;
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
  title: '簡単メニュー',
  description:
    'パンチだけの短めのメニューです。ノーマルメニューが難しい人におすすめ',
  timeLimit: 1000,
  numOfInstructions: 30,
  instructionTypes: [
    LeftHandLeftPunch,
    LeftHandRightPunch,
    RightHandLeftPunch,
    RightHandRightPunch,
  ],
};

export const NormalMenu: Menu = {
  title: 'ノーマルメニュー',
  description:
    'おすすめのメニュー!。パンチとキックを組み合わせたコースで、短い時間で気持ちよく運動できます。Ï',
  timeLimit: 1000,
  numOfInstructions: 50,
  instructionTypes: [
    LeftHandLeftPunch,
    LeftHandRightPunch,
    RightHandLeftPunch,
    RightHandRightPunch,
    LeftLegLeftKick,
    LeftLegRightKick,
    RightLegLeftKick,
    RightLegRightKick,
  ],
};

export const HardMenu: Menu = {
  title: 'ハードメニュー',
  description:
    'ノーマルメニューでは物足りない方におすすめ、長くて少しキツいメニューです。',
  timeLimit: 1500,
  numOfInstructions: 100,
  instructionTypes: [
    LeftHandLeftPunch,
    LeftHandRightPunch,
    RightHandLeftPunch,
    RightHandRightPunch,
    LeftLegLeftKick,
    LeftLegRightKick,
    RightLegLeftKick,
    RightLegRightKick,
  ],
};
