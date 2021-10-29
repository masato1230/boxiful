import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { createInstructionsFromMenu } from "../../state";
import { calculateBoxfulAge } from "../../utils/scores";

interface ResultMainProps {
  score: number;
  doughnutChartRef: React.RefObject<HTMLCanvasElement>;
}

const ResultMain: React.FC<ResultMainProps> = ({ score, doughnutChartRef }) => {
  // reducer
  const { menu, instructions, scores } = useTypedSelector((state) => {
    return state.training;
  });
  const { setInstructions, resetScores } = useActions();

  const history = useHistory();

  const onAgainClick = () => {
    // reset instructions and scores in reducer
    setInstructions(createInstructionsFromMenu(menu));
    resetScores();
    // redirect to training page
    history.push('/training');
  };

  return (
    <div
      className="pt-10"
      style={{ height: doughnutChartRef.current?.style.height || 0 }}
    >
      <p className="text-2xl font-medium">あなたのボクシフル年齢は</p>
      <h2 className="text-5xl font-bold text-center w-full mt-2 py-10">
        {calculateBoxfulAge(score)}歳です。
      </h2>
      <p className="text-xs ml-10 w-full">
        ボクシフル年齢はあなたの瞬発力と体力を評価した年齢です。
      </p>
      <div className="flex">
        <Link
          className="w-5/12 bg-yellow-500 hover:bg-yellow-700 text-white text-center py-2 px-3 rounded text-sm my-5 mx-1"
          to="/"
        >
          ダッシュボードに戻る
        </Link>
        <div
          className="w-5/12 bg-gray-500 hover:bg-gray-700 text-white text-center py-2 px-3 rounded text-sm my-5 mx-1"
          onClick={onAgainClick}
        >
          もう一度同じメニュー
        </div>
      </div>
    </div>
  );
};

export default ResultMain;
