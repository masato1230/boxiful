import { Chart, ChartDataset, registerables } from 'chart.js';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { createInstructionsFromMenu } from '../../state';
import {
  calculateBoxfulAge,
  calculateKickScore,
  calculatePunchScore,
  calculateResultScore,
  calculateTotalCalorieFromInstructions,
} from '../../utils/scores';
import ResultDetail from './ResultDetail';
import ResultMain from './ResultMain';
import ScoreDoughnutChart from './ScoreDoughnutChart';

const Result = () => {
  // reducer
  const { menu, instructions, scores } = useTypedSelector((state) => {
    return state.training;
  });
  const { setInstructions, resetScores } = useActions();
  // states
  const [score, setScore] = useState(0);
  const [doughnutChart, setDoughnutChart] = useState<Chart>();

  const history = useHistory();

  // set up
  useEffect(() => {
    // redirect to dashboard when scores are empty
    if (typeof scores[0] === 'undefined') {
      history.push('/');
      // TODO: add finish sound and finish modal
      return;
    }
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

    setDoughnutChart(
      new Chart(doughnutChartRef.current?.getContext('2d'), {
        type: 'doughnut',
        data,
        options: {
          borderColor: 'rgba(255, 255, 255, 0.5)',
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      })
    );
  }, [score]);

  const onAgainClick = () => {
    // reset instructions and scores in reducer
    setInstructions(createInstructionsFromMenu(menu));
    resetScores();
    // redirect to training page
    history.push('/training');
  };

  return (
    <div className="container mx-auto px-3">
      <div className="h-screen">
        <div className="flex">
          {/* スコア */}
          <div className="w-4/12 p-5">
            <h2 className="text-3xl font-medium mb-2">トレーニング評価</h2>
            <div
              className="justify-center content-center flex flex-wrap"
              style={{ height: doughnutChartRef.current?.style.height || 0 }}
            >
              <canvas
                className="mx-2 rounded-xl absolute"
                ref={doughnutChartRef}
              ></canvas>
              <h2 className="text-5xl font-bold text-center">{score}点</h2>
            </div>
          </div>
          <div>
            <ResultMain score={score} doughnutChartRef={doughnutChartRef} />
          </div>
        </div>
        {/* パンチ・キック */}
        <div className="flex">
          <div className="w-1/2">
            {calculatePunchScore(scores, instructions) && (
              <div className="w-1/2">
                <h2 className="text-xl font-medium mb-2">パンチ評価</h2>
                <ScoreDoughnutChart
                  score={calculatePunchScore(scores, instructions) || 0}
                  color="rgb(54, 162, 235)"
                />
              </div>
            )}
            {calculateKickScore(scores, instructions) && (
              <div className="w-1/2 mt-5">
                <h2 className="text-xl font-medium mb-2">キック評価</h2>
                <ScoreDoughnutChart
                  score={calculateKickScore(scores, instructions) || 0}
                  color="rgb(255, 205, 86)"
                />
              </div>
            )}
          </div>
          <div className="w-1/2">
            <ResultDetail />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
