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
import BrowserBackModal from './BrowserBackModal';
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
  const [isBrowserBackModalShow, setIsBrowserBackModalShow] = useState(false);

  const history = useHistory();

  // manage browser back
  const browserBackListener = (e: PopStateEvent) => {
    e.preventDefault();
    history.go(1);
    setIsBrowserBackModalShow(true);
  };

  const setBrowserBackWarning = () => {
    console.log('set');
    window.addEventListener('popstate', browserBackListener);
  };

  // set up
  useEffect(() => {
    // redirect to dashboard when scores are empty
    if (typeof scores[0] === 'undefined') {
      history.push('/');
      // TODO: add finish sound and finish modal
      return;
    }

    // Set Browser back warning
    setBrowserBackWarning();

    setScore(calculateResultScore(scores));

    // clear event listeners
    return () => {
      window.removeEventListener('popstate', browserBackListener);
    };
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

  return (
    <React.Fragment>
      {isBrowserBackModalShow && (
        <BrowserBackModal
          setIsBrowserBackModalShow={setIsBrowserBackModalShow}
        />
      )}
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
            <div className="w-2/12"></div>
            <div className="w-6/12 mr-max">
              <ResultMain score={score} doughnutChartRef={doughnutChartRef} />
            </div>
          </div>
          {/* パンチ・キック */}
          <div className="flex">
            <div className="w-1/2 flex">
              {calculatePunchScore(scores, instructions) && (
                <div className="w-5/12 mt-5">
                  <h2 className="text-xl font-medium mb-2">パンチ評価</h2>
                  <ScoreDoughnutChart
                    score={calculatePunchScore(scores, instructions) || 0}
                    color="rgb(54, 162, 235)"
                  />
                </div>
              )}
              <div className="w-1/12"></div>
              {calculateKickScore(scores, instructions) && (
                <div className="w-5/12 mt-5">
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
    </React.Fragment>
  );
};

export default Result;
