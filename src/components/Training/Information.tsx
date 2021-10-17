import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import React, { useState, useEffect } from 'react';
import { NormalizedLandmarkList, POSE_LANDMARKS } from '@mediapipe/pose';
import sound from '../../sounds/good-punch.mp3';
import { Instruction } from './Instructions';

interface InformationProps {
  instruction: Instruction;
  isMoveStarted: boolean;
  isMoveEnded: boolean;
  leftArmAngel: number;
  rightArmAngle: number;
}

const Information: React.FC<InformationProps> = ({
  instruction,
  leftArmAngel,
  rightArmAngle,
}) => {

  if (!leftArmAngel) {
    return <div>loading</div>;
  }

  return (
    <React.Fragment>
      {/* left arm: {leftArmAngel}
      <br />
      right arm: {rightArmAngle}
      <br />
      left stretch: {isLeftArmStretch && <>Stretch</>}
      <br />
      right stretch: {isRightArmStretch && <>Stretch</>} */}
      <h2 className="text-4xl">{instruction.title}</h2>
      <instruction.icon color="white" size="200" />
    </React.Fragment>
  );
};

export default Information;
