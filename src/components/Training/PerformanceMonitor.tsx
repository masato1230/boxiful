import React, { useState, useEffect } from 'react';
import { NormalizedLandmarkList, POSE_LANDMARKS } from '@mediapipe/pose';
// import sound from '../../sounds/good-punch.mp3';

interface PerformanceMonitorProps {
  poseLandmarks: NormalizedLandmarkList | undefined;
  leftArmAngel: number;
  rightArmAngle: number;
  isLeftArmStretch: boolean;
  isRightArmStretch: boolean;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  leftArmAngel,
  rightArmAngle,
  isLeftArmStretch,
  isRightArmStretch,
}) => {
  const goodPunchSound = new Audio('../../sounds/good-punch.mp3');
  let count = 0;

  useEffect(() => {
    // if (isRightArmStretch) {
    //   const audio = new Audio(sound);
    //   audio.play();
    // }
    const audioEl = document.getElementsByClassName('audio-element')[0] as HTMLAudioElement;
    if (audioEl !== undefined) {
      audioEl.play();
      console.log('Play');
    }
    console.log(audioEl);
  }, [isLeftArmStretch]);

  if (!leftArmAngel) {
    return <div>loading</div>;
  }

  return (
    <React.Fragment>
      left arm: {leftArmAngel}
      <br />
      right arm: {rightArmAngle}
      <br />
      left stretch: {isLeftArmStretch && <>Stretch</>}
      <br />
      right stretch: {isRightArmStretch && <>Stretch</>}
      <audio className="audio-element">
        <source src={process.env.PUBLIC_URL + '/audio/good-punch.mp3'}></source>
      </audio>
    </React.Fragment>
  );
};

export default PerformanceMonitor;
