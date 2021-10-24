import { useEffect, useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import {
  calculateBoxfulAge,
  calculateKickScore,
  calculatePunchScore,
  calculateResultScore,
  calculateTotalCalorieFromInstructions,
} from '../utils/scores';

const Result = () => {
  // reducer
  const { menu, instructions, scores } = useTypedSelector((state) => {
    return state.training;
  });
  // states
  const [score, setScore] = useState(0);

  // set up
  useEffect(() => {
    setScore(Math.round(calculateResultScore(scores)));
  }, []);

  console.log(menu);
  console.log(instructions);
  console.log(scores);
  console.log()

  return (
    <div>
      <p>Result</p>
      <p>score: {score} 点</p>
      <p>point: {Math.round(scores.reduce((acc, cur) => acc + cur, 0))}</p>
      <p>消費カロリー: {calculateTotalCalorieFromInstructions(instructions)}</p>
      <p>あなたのボクシフル年齢: {calculateBoxfulAge(score)}</p>
      <p>パンチのスコア: {calculatePunchScore(scores, instructions)}</p>
      <p>キックのスコア: {calculateKickScore(scores, instructions)}</p>
    </div>
  );
};

export default Result;
