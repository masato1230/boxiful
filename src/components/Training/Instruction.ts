import { NormalizedLandmarkList, POSE_LANDMARKS } from '@mediapipe/pose';
import { IconType } from 'react-icons';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import { calculateLandmarkAngleXY_YZ_ZX } from '../../utils/angles/landmarkAngle';

interface detectStateParams {
  arm?: number;
}

export interface Instruction {
  title: string;
  icon: IconType;
  detectStartFunction: (poseLandmarks: NormalizedLandmarkList) => boolean;
  detectEndFunction: (poseLandmarks: NormalizedLandmarkList) => boolean;
}

const detectLeftArmPunchReady = (poseLandmarks: NormalizedLandmarkList) => {
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
}

// 1-1.
export const LeftHandLeftPunch: Instruction = {
  title: 'Left Hand Left Punch',
  icon: BsArrowLeftCircleFill,
  detectStartFunction: detectLeftArmPunchReady,
  detectEndFunction: (poseLandmarks: NormalizedLandmarkList) => {
    const leftArmAngle = calculateLandmarkAngleXY_YZ_ZX(
      POSE_LANDMARKS.LEFT_WRIST,
      POSE_LANDMARKS.LEFT_ELBOW,
      POSE_LANDMARKS.LEFT_SHOULDER,
      poseLandmarks
    ).angleXY;
    if (
      Math.abs(leftArmAngle) >= 130 &&
      poseLandmarks[POSE_LANDMARKS.LEFT_WRIST].x >
        poseLandmarks[POSE_LANDMARKS.LEFT_SHOULDER].x
    ) {
      return true;
    }
    return false;
  },
};

// 1-2.
export const LeftHandRightPunch: Instruction = {
  title: 'Left Hand Right Punch',
  icon: BsArrowRightCircleFill,
  detectStartFunction: detectLeftArmPunchReady,
  detectEndFunction: (poseLandmarks: NormalizedLandmarkList) => {
    const leftArmAngle = calculateLandmarkAngleXY_YZ_ZX(
      POSE_LANDMARKS.LEFT_WRIST,
      POSE_LANDMARKS.LEFT_ELBOW,
      POSE_LANDMARKS.LEFT_SHOULDER,
      poseLandmarks
    ).angleXY;
    if (
      Math.abs(leftArmAngle) >= 130 &&
      poseLandmarks[POSE_LANDMARKS.LEFT_WRIST].x <
        poseLandmarks[POSE_LANDMARKS.LEFT_SHOULDER].x
    ) {
      return true;
    }
    return false;
  },
}

export const LeftJabInstruction: Instruction = {
  title: 'Left Jab',
  icon: BsArrowLeftCircleFill,
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
