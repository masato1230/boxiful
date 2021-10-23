import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import React, { useState, useEffect, useRef } from 'react';
import { NormalizedLandmarkList, POSE_LANDMARKS } from '@mediapipe/pose';
import sound from '../../sounds/good-punch.mp3';
import {
  Instruction,
  LeftHandLeftPunch,
  LeftHandRightPunch,
  LeftLegLeftKick,
  LeftLegRightKick,
  RightHandLeftPunch,
  RightHandRightPunch,
  RightLegLeftKick,
  RightLegRightKick,
} from './Instructions';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import {
  Chart,
  ChartConfiguration,
  ChartData,
  ChartDataset,
  registerables,
} from 'chart.js';

const determineInstructionColor = (instruction: Instruction) => {
  switch (instruction) {
    case LeftHandLeftPunch:
    case LeftHandRightPunch:
      return 'rgba(5, 150, 105, 0.3)';
    case RightHandLeftPunch:
    case RightHandRightPunch:
      return 'rgba(109, 40, 217, 0.3)';
    case LeftLegLeftKick:
    case LeftLegRightKick:
      return 'rgba(5, 150, 105, 1)';
    case RightLegLeftKick:
    case RightLegRightKick:
      return 'rgba(109, 40, 217, 1)';
    default:
      return 'rgba(0, 0, 0, 1)';
  }
};

interface InformationProps {
  isMoveStarted: boolean;
  isMoveEnded: boolean;
}

const Information: React.FC<InformationProps> = () => {
  // Redux - get actionCreators adn states
  const { instructions, scores } = useTypedSelector((state) => {
    return {
      instructions: state.training.instructions,
      scores: state.training.scores,
    };
  });
  const instruction = instructions[scores.length];

  // useState
  const [chart, setChart] = useState<Chart>();

  // chart set up
  const chartRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    Chart.register(...registerables);
    // clear canvas
    if (chart) {
      chart.destroy();
    }
    // create datasets
    const datasets: ChartDataset[] = [
      {
        label: 'score',
        data: [...scores],
        backgroundColor: instructions.map((instruction) => {
          return 'rgba(255, 99, 132, 1)';
        }),
        borderColor: instructions.map((instruction) => {
          return 'rgba(255, 99, 255, 1)';
        }),
        borderWidth: 1,
        borderRadius: 1000,
      },
    ];
    // create chart
    setChart(
      new Chart(chartRef.current?.getContext('2d'), {
        type: 'bar',
        data: {
          labels: scores.map((score, index) => {
            return index + 1;
          }),
          datasets,
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              suggestedMax: 100,
            },
          },
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: false,
              text: 'scores',
            },
          },
        },
      })
    );
  }, []);

  // update chart
  useEffect(() => {
    if (chart?.data.datasets[0].data.length !== scores.length) {
      chart?.data.labels?.push(chart.data.labels.length);
      chart?.data.datasets[0].data.push(scores[scores.length - 1]);
      chart?.update();
    }
  });

  return (
    <div className="h-full">
      <h2 className="pt-5 text-5xl text-black text-center font-bold px-5 h-1/6">
        {instruction.title}
      </h2>
      <div className="align-middle mx-auto w-min h-2/6 pt-5">
        <instruction.icon color={determineInstructionColor(instruction)} size="150" />
      </div>
      <div className="h-1/6 px-5">
        <div className="">
          <p className="float-right inline-block text-right text-5xl"> {`${scores.length} / ${instructions.length}`}</p>
        </div>
      </div>
      <canvas className="mx-2 rounded-xl h-2/6" style={{ maxHeight: '33%', minHeight: '33%' }} ref={chartRef}></canvas>
    </div>
  );
};

export default Information;
