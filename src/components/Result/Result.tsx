import { Chart, registerables } from 'chart.js';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import {
  calculateKickScore,
  calculatePunchScore,
  calculateResultScore,
} from '../../utils/scores';
import BrowserBackModal from './BrowserBackModal';
import ResultDetail from './ResultDetail';
import ResultMain from './ResultMain';
import ScoreDoughnutChart from './ScoreDoughnutChart';

const Result = () => {
  // reducer
  const { instructions, scores } = useTypedSelector((state) => {
    return state.training;
  });
  // states
  const [score, setScore] = useState(0);
  const [doughnutChart, setDoughnutChart] = useState<Chart>();
  const [isBrowserBackModalShow, setIsBrowserBackModalShow] = useState(false);
  // hooks
  const history = useHistory();

  // manage browser back
  const browserBackListener = (e: PopStateEvent) => {
    e.preventDefault();
    history.go(1);
    setIsBrowserBackModalShow(true);
  };

  const setBrowserBackWarning = () => {
    window.addEventListener('popstate', browserBackListener);
  };

  // set up
  useEffect(() => {
    // redirect to dashboard when scores are empty
    if (typeof scores[0] === 'undefined') {
      history.push('/');
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
      <div className="container mx-auto px-8 md:px-3">
        <h1 className="text-3xl font-bold text-yellow-500 mt-3">Result</h1>
        <div className="md:flex">
          {/* スコア */}
          <div className="md:w-5/12 py-5 md:p-5">
            <h2 className="text-xl md:text-3xl font-bold mb-2">全体評価</h2>
            <div className="flex justify-center md:justify-around items-center">
              <div
                className="justify-center content-center flex flex-wrap w-16 md:w-full"
                style={{ height: doughnutChartRef.current?.style.height || 0 }}
              >
                <canvas
                  className="mx-2 rounded-xl md:absolute"
                  ref={doughnutChartRef}
                ></canvas>
                {/* PC画面の時のスコア表示 */}
                <p className="hidden md:block text-4xl font-bold text-center">
                  {score}点
                </p>
              </div>
              {/* スマホ画面の時のスコア表示 */}
              <p className="md:hidden text-4xl py-16 font-bold text-center top-1/2">
                {score}点
              </p>
            </div>
          </div>
          <div className="hidden md:block w-1/12"></div>
          <div className="md:w-6/12 mr-max">
            <ResultMain score={score} doughnutChartRef={doughnutChartRef} />
          </div>
        </div>
        <div className="md:flex">
        {/* パンチ・キック dismiss when display is small */}
          <div className="hidden md:flex w-1/2">
            {calculatePunchScore(scores, instructions) && (
              <div className="w-5/12 mt-5">
                <h2 className="text-xl font-bold mb-2">パンチ評価</h2>
                <ScoreDoughnutChart
                  score={calculatePunchScore(scores, instructions) || 0}
                  color="rgb(54, 162, 235)"
                />
              </div>
            )}
            <div className="w-1/12"></div>
            {calculateKickScore(scores, instructions) && (
              <div className="w-5/12 mt-5">
                <h2 className="text-xl font-bold mb-2">キック評価</h2>
                <ScoreDoughnutChart
                  score={calculateKickScore(scores, instructions) || 0}
                  color="rgb(255, 205, 86)"
                />
              </div>
            )}
          </div>
          {/* 結果詳細 */}
          <div className="md:w-1/2">
            <ResultDetail />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Result;
