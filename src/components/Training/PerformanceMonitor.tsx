import React, { useState, useEffect } from 'react';
import { NormalizedLandmarkList, POSE_LANDMARKS } from '@mediapipe/pose';
import { calculateLandmarkAngleXY_YZ_ZX } from '../../utils/angles/landmarkAngle';

interface PerformanceMonitorProps {
  poseLandmarks: NormalizedLandmarkList | undefined;
  leftArmAngel: number;
  rightArmAngle: number;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  leftArmAngel,
  rightArmAngle,
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
      righ tarm: {rightArmAngle}
    </React.Fragment>
  );
};

export default PerformanceMonitor;
