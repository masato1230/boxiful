import { NormalizedLandmarkList, POSE_LANDMARKS } from '@mediapipe/pose';
import { useEffect, useState } from 'react';
import { calculateLandmarkAngleXY_YZ_ZX } from '../../utils/angles/landmarkAngle';
import PerformanceMonitor from './PerformanceMonitor';
import PoseEstimation from './PoseEstimation';

const Training = () => {
  const [poseLandmarks, setPoseLandmarks] = useState<NormalizedLandmarkList>();
  const [leftArmAngle, setLeftArmAngle] = useState(0);
  const [rightArmAngle, setRightArmAngle] = useState(0);
  const [isLeftArmStretch, setIsLeftArmStretch] = useState(false);
  const [isRightArmStretch, setIsRightArmStretch] = useState(false);

  // update angles
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

  // update left arm stretch state
  useEffect(() => {
    if (Math.abs(leftArmAngle) >= 140 && !isLeftArmStretch) {
      setIsLeftArmStretch(!isLeftArmStretch);
    } else if (Math.abs(leftArmAngle) < 90 && isLeftArmStretch) {
      setIsLeftArmStretch(!isLeftArmStretch);
    }
  }, [leftArmAngle]);
  
  // update right arm stretch state
  useEffect(() => {
    if (Math.abs(rightArmAngle) >= 140 && !isRightArmStretch) {
      setIsRightArmStretch(!isRightArmStretch);
    } else if (Math.abs(rightArmAngle) < 90 && isRightArmStretch) {
      setIsRightArmStretch(!isRightArmStretch);
    }
  }, [rightArmAngle]);

  return (
    <div className="container mx-auto flex h-screen py-1">
      <div className="bg-yellow-500 w-1/2 mx-3 rounded-xl">
        <PerformanceMonitor
          poseLandmarks={poseLandmarks}
          leftArmAngel={leftArmAngle}
          rightArmAngle={rightArmAngle}
          isLeftArmStretch={isLeftArmStretch}
          isRightArmStretch={isRightArmStretch}
        />
      </div>
      <div className="w-1/2 mx-3 rounded-xl">
        <PoseEstimation setPoseLandmarks={setPoseLandmarks} />
      </div>
    </div>
  );
};

export default Training;
