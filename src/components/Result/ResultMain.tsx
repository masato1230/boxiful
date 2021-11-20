import React, { useState, useEffect } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
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
  }, [score, menu, instructions]);

  return (
    <div
      className="md:py-5"
      style={{ minHeight: doughnutChartRef.current?.style.height || 0 }}
    >
      <p className="text-lg md:text-2xl font-medium">あなたのボクシフル年齢は</p>
      <h2 className="text-5xl font-bold text-center w-full md:mt-2 pt-2 pb-5 md:py-10">
        {calculateBoxfulAge(score)}歳です。
      </h2>
      <p className="text-xs md:ml-10 w-full">
        ボクシフル年齢はあなたの瞬発力と体力を評価した年齢です。
      </p>
      <PageTransitionButtons />
      {shareTitle && <SocialShareButtons shareTitle={shareTitle} />}
    </div>
  );
};

export default ResultMain;
