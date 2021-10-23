export const calculateNormalMenuMoveScore = (time: number) => {  
  let score = 100 - (time - 0.6) * 30;
  if (score > 100) {
    score = 100;
  } else if (score < 20) {
    score = 20;
  }
  return Math.round(score);
}

export const judgeFromScore = (score: number): ('Good' | 'Great' | 'Slow') => {
  if (score >= 80) {
    return 'Great';
  } else if (score >= 30) {
    return 'Good';
  } else {
    return 'Slow';
  }
}

export const calculateResultScore = (scores: number[]) => {
  scores.sort();
  const extractOutliersScores = scores.slice(3, scores.length - 4);
  const extractOutliersSum =  extractOutliersScores.reduce((accumulator: number, currentValue: number) => {
    return accumulator + currentValue;
  });
  return extractOutliersSum / extractOutliersScores.length;
}
