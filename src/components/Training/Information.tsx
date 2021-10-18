import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import React, { useState, useEffect, useRef } from 'react';
import { NormalizedLandmarkList, POSE_LANDMARKS } from '@mediapipe/pose';
import sound from '../../sounds/good-punch.mp3';
import { Instruction } from './Instructions';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Chart, ChartConfiguration, ChartData, ChartDataset, registerables } from 'chart.js';

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
  const [managedScores, setManagedScores] = useState<number[]>();  

  // chart set up
  const chartRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    console.log('create chart');
    
    Chart.register(...registerables);
    // clear canvas
    if (chart) {
      chart.destroy();
      console.log('destoroy')
    }
    // create datasets
    const datasets: ChartDataset[] = [{
      label: 'faf',
      data: [...scores],
      backgroundColor: instructions.map((instruction) => {
        return 'rgba(255, 99, 132, 1)';
      }),
      borderColor: instructions.map((instruction) => {
        return 'rgba(255, 99, 255, 1)';
      }),
      borderWidth: 1,
    }];
    // create chart
    setChart(new Chart(chartRef.current?.getContext('2d'), {
      type: 'bar',
      data: {
        labels: instructions.map((instruction, index) => {
          return index+1;
        }),
        datasets
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
            display: true,
            text: 'score',
          },
        },
      },
    }));
  }, []);

  // update chart
  useEffect(() => {
    if (chart?.data.datasets[0].data.length !== scores.length) {
      chart?.data.datasets[0].data.push(scores[scores.length-1]);
      chart?.update();
    }
  });

  return (
    <div>
      <h2 className="text-5xl text-black text-center py-5">
        {instruction.title}
      </h2>
      <div className="mx-auto w-min py-5">
        <instruction.icon color="rgba(255, 168, 21, 1)" size="200" />
      </div>
      <canvas className="w-full h-full p-1" ref={chartRef}></canvas>
    </div>
  );
};

export default Information;
