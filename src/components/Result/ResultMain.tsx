import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { createInstructionsFromMenu } from '../../state';
import {
  calculateBoxfulAge,
  calculateTotalCalorieFromInstructions,
} from '../../utils/scores';
import PageTransitionButtons from './PageTransitionButtons';
import SocialShareButtons from '../SocialShareButtons';

interface ResultMainProps {
  score: number;
  doughnutChartRef: React.RefObject<HTMLCanvasElement>;
}

const ResultMain: React.FC<ResultMainProps> = ({ score, doughnutChartRef }) => {
  // reducer
  const { menu, instructions } = useTypedSelector((state) => {
    return state.training;
  });
  // state
  const [shareTitle, setShareTitle] = useState<string | null>(null);

  useEffect(() => {
    if (typeof menu !== 'undefined') {
      setShareTitle(
        `Boxfulの${
          menu.title
        }で${score}点でした。\nボクシフル年齢: ${calculateBoxfulAge(
          score
        )}歳 \n消費カロリー: ${calculateTotalCalorieFromInstructions(
          instructions
        )}kcal\n`
      );
    }
  }, [score]);

  return (
    <div
      className="py-5"
      style={{ minHeight: doughnutChartRef.current?.style.height || 0 }}
    >
      <p className="text-2xl font-medium">あなたのボクシフル年齢は</p>
      <h2 className="text-5xl font-bold text-center w-full mt-2 py-10">
        {calculateBoxfulAge(score)}歳です。
      </h2>
      <p className="text-xs ml-10 w-full">
        ボクシフル年齢はあなたの瞬発力と体力を評価した年齢です。
      </p>
      <PageTransitionButtons />
      {shareTitle && <SocialShareButtons shareTitle={shareTitle} />}
    </div>
  );
};

export default ResultMain;
