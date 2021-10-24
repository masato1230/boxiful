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

export const calculateNormalMenuMoveScore = (time: number) => {
  let score = 100 - (time - 0.6) * 30;
  if (score > 100) {
    score = 100;
  } else if (score < 20) {
    score = 20;
  }
  return Math.round(score);
};

export const judgeFromScore = (score: number): 'Good' | 'Great' | 'Slow' => {
  if (score >= 80) {
    return 'Great';
  } else if (score >= 30) {
    return 'Good';
  } else {
    return 'Slow';
  }
};

export const calculateResultScore = (scores: number[]) => {
  scores.sort();
  const extractOutliersScores = scores.slice(3, scores.length - 3);
  console.log(extractOutliersScores);
  console.log(scores);
  
  
  const extractOutliersSum = extractOutliersScores.reduce(
    (accumulator: number, currentValue: number) => {
      return accumulator + currentValue;
    }
  );
  return Math.round(extractOutliersSum / extractOutliersScores.length);
};

export const calculatePunchScore = (
  scores: number[],
  instructions: Instruction[]
) => {
  scores.sort();
  
  const extractOutliersScores = scores.slice(3, scores.length - 3);
  const punchScores = extractOutliersScores.filter((score, index) => {
    return (
      [LeftHandLeftPunch,
      LeftHandRightPunch,
      RightHandLeftPunch,
      RightHandRightPunch].includes(instructions[index])
    );
  });
  if (punchScores.length === 0) return;
  
  const sum = punchScores.reduce(
    (accumulator: number, currentValue: number) => {
      return accumulator + currentValue;
    }
  );
  return Math.round(sum / punchScores.length);
};

export const calculateKickScore = (
  scores: number[],
  instructions: Instruction[]
) => {
  scores.sort();
  const extractOutliersScores = scores.slice(3, scores.length - 3);
  const kickScores = extractOutliersScores.filter((score, index) => {

    return (
      [LeftLegLeftKick,
        LeftLegRightKick,
        RightLegLeftKick,
        RightLegRightKick].includes(instructions[index])
    );
  });

  if (kickScores.length === 0) return;
  const sum = kickScores.reduce((accumulator: number, currentValue: number) => {
    return accumulator + currentValue;
  });
  return Math.round(sum / kickScores.length);
};

export const calculateTotalCalorieFromInstructions = (
  instructions: Instruction[]
) => {
  const totalCalorie = instructions.reduce((accumulator, instruction) => {
    if (
      instruction === LeftHandLeftPunch ||
      LeftLegRightKick ||
      RightHandLeftPunch ||
      RightHandRightPunch
    ) {
      return accumulator + 0.3;
    } else {
      return accumulator + 0.6;
    }
  }, 0);
  return totalCalorie;
};

// TODO: Change
export const calculateBoxfulAge = (score: number) => {
  let age = 110 - score;
  if (age < 20) {
    age = 20;
  }
  return age;
};
