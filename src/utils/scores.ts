export const calculateNormalMenuMoveScore = (time: number) => {  
  let score = 100 - (time - 0.6) * 30;
  if (score > 100) {
    score = 100;
  } else if (score < 20) {
    score = 20;
  }
  return Math.round(score);
}

export const judgeFromScore = (score: number): ('good' | 'great' | 'miss') => {
  if (score >= 80) {
    return 'great';
  } else if (score >= 30) {
    return 'good';
  } else {
    return 'miss';
  }
}