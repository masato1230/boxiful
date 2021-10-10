import { NormalizedLandmarkList, POSE_LANDMARKS } from '@mediapipe/pose';
import { calculateLandmarkAngleXY_YZ_ZX } from '../../utils/angles/landmarkAngle';

interface detectStateParams {
  arm?: number;
}

export interface Instruction {
  title: string;
  detectStartFunction: (poseLandmarks: NormalizedLandmarkList) => boolean;
  detectEndFunction: (poseLandmarks: NormalizedLandmarkList) => boolean;
}

export const LeftJabInstruction: Instruction = {
  title: 'Left Jab',
  detectStartFunction: (poseLandmarks: NormalizedLandmarkList) => {
    const leftArmAngle = calculateLandmarkAngleXY_YZ_ZX(
      POSE_LANDMARKS.LEFT_WRIST,
      POSE_LANDMARKS.LEFT_ELBOW,
      POSE_LANDMARKS.LEFT_SHOULDER,
      poseLandmarks
    ).angleXY;
    if (Math.abs(leftArmAngle) <= 90) {
      return true;
    }
    return false;
  },
  detectEndFunction: (poseLandmarks: NormalizedLandmarkList) => {
    const leftArmAngle = calculateLandmarkAngleXY_YZ_ZX(
      POSE_LANDMARKS.LEFT_WRIST,
      POSE_LANDMARKS.LEFT_ELBOW,
      POSE_LANDMARKS.LEFT_SHOULDER,
      poseLandmarks
    ).angleXY;
    if (Math.abs(leftArmAngle) >= 130) {
      return true;
    }
    return false;
  },
};
