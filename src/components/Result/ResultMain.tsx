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
import {
  TwitterIcon,
  TwitterShareButton,
  LineShareButton,
  LineIcon,
} from 'react-share';

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
    console.log(score, calculateBoxfulAge(score));

    if (typeof menu !== 'undefined') {
      setShareTitle(
        `Boxfulの${
          menu.title
        }で${score}点でした。\nボクシフル年齢: ${calculateBoxfulAge(
          score
        )}歳 \n消費カロリー: ${calculateTotalCalorieFromInstructions(
          instructions
        )}kcal \n`
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
      {shareTitle && (
        <React.Fragment>
          <div className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm my-3 mx-1">
            <TwitterShareButton
              // TODO: Chagnge url
              url={'http://localhost:3000'}
              title={shareTitle}
              hashtags={['boxiful']}
              className="text-white w-full h-full"
            >
              <TwitterIcon className="inline-block mr-3" size={24} round />
              Twitterで結果をシェア
            </TwitterShareButton>
          </div>
          <div className="bg-green-600 hover:bg-green-800 text-white text-center py-1 px-3 rounded text-sm my-3 mx-1">
            <LineShareButton
              // TODO: Chagnge url
              url={'http://localhost:3000'}
              title={shareTitle}
              className="text-white w-full h-full"
            >
              <LineIcon className="inline-block mr-3" size={24} round />
              Lineで結果をシェア
            </LineShareButton>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default ResultMain;
