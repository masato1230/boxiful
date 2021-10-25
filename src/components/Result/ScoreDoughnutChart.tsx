import { Chart, registerables } from 'chart.js';
import React, { useEffect, useRef, useState } from 'react';

interface ScoreDoughnutChartProps {
  score: number;
  color: string;
}

const ScoreDoughnutChart: React.FC<ScoreDoughnutChartProps> = ({
  score,
  color = 'rgb(255, 99, 132)',
}) => {
  const [doughnutChart, setDoughnutChart] = useState<Chart>();
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
          data: [score, 100 - score],
          backgroundColor: [color, 'rgb(255, 255, 255)'],
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
      <div
        className="justify-center content-center flex flex-wrap"
        style={{ height: doughnutChartRef.current?.style.height || 0 }}
      >
        <canvas
          className="mx-2 rounded-xl absolute"
          ref={doughnutChartRef}
        ></canvas>
        <h2 className="text-2xl font-bold text-center">{score}点</h2>
      </div>
    </React.Fragment>
  );
};

export default ScoreDoughnutChart;
