import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { createInstructionsFromMenu } from "../../state";
import { calculateBoxfulAge } from "../../utils/scores";
import PageTransitionButtons from "./PageTransitionButtons";

interface ResultMainProps {
  score: number;
  doughnutChartRef: React.RefObject<HTMLCanvasElement>;
}

const ResultMain: React.FC<ResultMainProps> = ({ score, doughnutChartRef }) => {
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
      <PageTransitionButtons />
    </div>
  );
};

export default ResultMain;
