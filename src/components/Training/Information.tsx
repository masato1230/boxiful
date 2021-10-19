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

const determineIconColor = (instruction: Instruction) => {
  switch (instruction) {
    case LeftHandLeftPunch:
    case LeftHandRightPunch:
      return 'rgba(0, 100, 255, 0.5)';
    case RightHandLeftPunch:
    case RightHandRightPunch:
      return 'rgba(255, 50, 0, 0.5)';
    case LeftLegLeftKick:
    case LeftLegRightKick:
      return 'rgba(0, 0, 255, 1)';
    case RightLegLeftKick:
    case RightLegRightKick:
      return 'rgba(255, 0, 0, 1)';
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
      },
    ];
    // create chart
    setChart(
      new Chart(chartRef.current?.getContext('2d'), {
        type: 'bar',
        data: {
          labels: instructions.map((instruction, index) => {
            return index + 1;
          }),
          datasets,
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
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
      chart?.data.datasets[0].data.push(scores[scores.length - 1]);
      chart?.update();
    }
  });

  return (
    <div>
      <h2 className="text-5xl text-black text-center py-5">
        {instruction.title}
      </h2>
      <div className="mx-auto w-min py-5">
        <instruction.icon color={determineIconColor(instruction)} size="200" />
      </div>
      <p className="text-right pr-5 text-3xl">{`${scores.length} / ${instructions.length}`}</p>
      <canvas className="w-full h-full mx-2" ref={chartRef}></canvas>
    </div>
  );
};

export default Information;
