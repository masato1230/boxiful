import React from 'react';
import { NormalizedLandmarkList } from '@mediapipe/pose';
import { calculateLandmarkAngleXY_YZ_ZX } from '../../utils/angles/landmarkAngle';

interface PerformanceMonitorProps {
  poseLandmarks: NormalizedLandmarkList | undefined;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  poseLandmarks,
}) => {
  if (!poseLandmarks) {
    return <div>loading</div>;
  }

  const leftArmAngles = calculateLandmarkAngleXY_YZ_ZX(15, 13, 11, poseLandmarks);
  const rightArmAngles = calculateLandmarkAngleXY_YZ_ZX(16, 14, 12, poseLandmarks);
  return <React.Fragment>
    leftarm: {leftArmAngles.angleXY}
    <br />
    rightarm: {rightArmAngles.angleXY}
  </React.Fragment>;
};

export default PerformanceMonitor;
