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

export const determineInstructionColor = (instruction: Instruction) => {
  switch (instruction) {
    case LeftHandLeftPunch:
    case LeftHandRightPunch:
      return 'rgba(59, 130, 246, 1)';
    case RightHandLeftPunch:
    case RightHandRightPunch:
      return 'rgba(239, 68, 68, 1)';
    case LeftLegLeftKick:
    case LeftLegRightKick:
      return 'rgba(5, 150, 105, 1)';
    case RightLegLeftKick:
    case RightLegRightKick:
      return 'rgba(109, 40, 217, 1)';
    default:
      return 'rgba(0, 0, 0, 1)';
  }
};
