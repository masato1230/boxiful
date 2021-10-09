import React, { useState, useEffect } from 'react';
import { NormalizedLandmarkList, POSE_LANDMARKS } from '@mediapipe/pose';
import { calculateLandmarkAngleXY_YZ_ZX } from '../../utils/angles/landmarkAngle';

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

  if (!leftArmAngel) {
    return <div>loading</div>;
  }
  
  // useEffect(() => {
  // }, [poseLandmarks]);

  return (
    <React.Fragment>
      left arm: {leftArmAngel}
      <br />
      right arm: {rightArmAngle}
      <br />
      left stretch: {isLeftArmStretch && <>Stretch</>}
      <br />
      right stretch: {isRightArmStretch && <>Stretch</>}
    </React.Fragment>
  );
};

export default PerformanceMonitor;
