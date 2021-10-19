export const calculateNormalMenuMoveScore = (time: number) => {
  console.log(time);
  
  let score = 100 - (time - 0.6) * 30;
  if (score > 100) {
    score = 100;
  } else if (score < 30) {
    score = 30;
  }
  return Math.round(score);
}