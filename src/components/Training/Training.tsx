import { NormalizedLandmarkList, POSE_LANDMARKS } from '@mediapipe/pose';
import { useEffect, useState } from 'react';
import { calculateLandmarkAngleXY_YZ_ZX } from '../../utils/angles/landmarkAngle';
import PerformanceMonitor from './PerformanceMonitor';
import PoseEstimation from './PoseEstimation';

const Training = () => {
  const [poseLandmarks, setPoseLandmarks] = useState<NormalizedLandmarkList>();
  const [leftArmAngle, setLeftArmAngle] = useState(0);
  const [rightArmAngle, setRightArmAngle] = useState(0);

  useEffect(() => {
    if (poseLandmarks) {
      setLeftArmAngle(calculateLandmarkAngleXY_YZ_ZX(
        POSE_LANDMARKS.LEFT_WRIST,
        POSE_LANDMARKS.LEFT_ELBOW,
        POSE_LANDMARKS.LEFT_SHOULDER,
        poseLandmarks
      ).angleXY);
      setRightArmAngle(calculateLandmarkAngleXY_YZ_ZX(
        POSE_LANDMARKS.RIGHT_WRIST,
        POSE_LANDMARKS.RIGHT_ELBOW,
        POSE_LANDMARKS.RIGHT_SHOULDER,
        poseLandmarks
      ).angleXY);
    }
  }, [poseLandmarks]);

  return (
    <div className="container mx-auto flex h-screen py-1">
      <div className="bg-yellow-500 w-1/2 mx-3 rounded-xl">
        <PerformanceMonitor
          poseLandmarks={poseLandmarks}
          leftArmAngel={leftArmAngle}
          rightArmAngle={rightArmAngle}
        />
      </div>
      <div className="w-1/2 mx-3 rounded-xl">
        <PoseEstimation setPoseLandmarks={setPoseLandmarks} />
      </div>
    </div>
  );
};

export default Training;
