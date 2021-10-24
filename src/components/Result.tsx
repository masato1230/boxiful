import { Chart, ChartDataset, registerables } from 'chart.js';
import { useEffect, useRef, useState } from 'react';
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
  const [doughnutChart, setChart] = useState<Chart>();

  // set up
  useEffect(() => {
    setScore(calculateResultScore(scores));
  }, []);

  // refs
  const doughnutChartRef = useRef<HTMLCanvasElement>(null);

  // doughnutChart set up
  useEffect(() => {
    Chart.register(...registerables);
    // clear canvas
    if (doughnutChart) {
      doughnutChart.destroy();
    }
    // create doughnutChart
    const data = {
      labels: ['スコア'],
      datasets: [
        {
          label: 'My First Dataset',
          data: [score, 100 - score],
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 255, 255)'],
          hoverOffset: 4,
        },
      ],
    };
    setChart(
      new Chart(doughnutChartRef.current?.getContext('2d'), {
        type: 'doughnut',
        data,
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      })
    );
  }, [score]);

  return (
    <div>
      <div className="h-screen">
        <div className="h-4/6 flex">
          {/* スコア */}
          <div className="w-1/2 p-5">
            <h2 className="text-3xl font-medium mb-2">トレーニング評価</h2>
            <div
              className="justify-center content-center flex flex-wrap"
              style={{ height: doughnutChartRef.current?.height || 0 }}
            >
              <canvas
                className="mx-2 rounded-xl absolute"
                ref={doughnutChartRef}
              ></canvas>
              <h2 className="text-5xl font-bold">{score}点</h2>
            </div>
          </div>
          {/* 年齢 */}
          <div
            className="w-1/2 p-5 flex flex-wrap content-center"
            style={{ height: doughnutChartRef.current?.height || 0 }}
          >
            <p className="text-2xl font-medium">あなたのボクシフル年齢は</p>
            <h2 className="text-5xl font-bold text-center w-full mt-2 mb-10">
              {calculateBoxfulAge(score)}歳です。
            </h2>
            <p className="text-xs ml-10ƒ">
              ボクシフル年齢はあなたの瞬発力と体力を評価した年齢です。
            </p>
          </div>
        </div>
        <p>Result</p>
        <p>score: {score} 点</p>
        <p>point: {Math.round(scores.reduce((acc, cur) => acc + cur, 0))}</p>
        <p>
          消費カロリー: {calculateTotalCalorieFromInstructions(instructions)}
        </p>
        <p>あなたのボクシフル年齢: {calculateBoxfulAge(score)}</p>
        <p>パンチのスコア: {calculatePunchScore(scores, instructions)}</p>
        <p>キックのスコア: {calculateKickScore(scores, instructions)}</p>
      </div>
    </div>
  );
};

export default Result;
