import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import React, { useState, useEffect } from 'react';
import { NormalizedLandmarkList, POSE_LANDMARKS } from '@mediapipe/pose';
import sound from '../../sounds/good-punch.mp3';
import { Instruction } from './Instructions';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

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

  return (
    <React.Fragment>
      <h2 className="text-4xl text-white text-center py-5">{instruction.title}</h2>
      <div className="mx-auto w-min py-5">
        <instruction.icon color="white" size="200" />
      </div>
    </React.Fragment>
  );
};

export default Information;
