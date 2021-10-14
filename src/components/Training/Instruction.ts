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

// return true if visibility satisfy minimum visibility
const minimumVisibilityCheck = (
  poseLandmarks: NormalizedLandmarkList,
  checkLandmarkIds: number[],
  minimumVisibility: number = 0.8
) => {
  let isSatisfied = true;
  checkLandmarkIds.forEach((landmarkId) => {
    if ((poseLandmarks[landmarkId].visibility as number) < minimumVisibility) {
      isSatisfied = false;
    }
  });
  return isSatisfied;
};

const detectLeftArmPunchReady = (poseLandmarks: NormalizedLandmarkList) => {
  if (!minimumVisibilityCheck(poseLandmarks, [
    POSE_LANDMARKS.LEFT_WRIST,
    POSE_LANDMARKS.LEFT_ELBOW,
    POSE_LANDMARKS.LEFT_SHOULDER,
  ])) {
    return false;
  }
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
};

const detectRightArmPunchReady = (poseLandmarks: NormalizedLandmarkList) => {
  if (!minimumVisibilityCheck(poseLandmarks, [
    POSE_LANDMARKS.RIGHT_WRIST,
    POSE_LANDMARKS.RIGHT_ELBOW,
    POSE_LANDMARKS.RIGHT_SHOULDER,
  ])) {
    return false;
  }
  
  const rightArmAngle = calculateLandmarkAngleXY_YZ_ZX(
    POSE_LANDMARKS.RIGHT_WRIST,
    POSE_LANDMARKS.RIGHT_ELBOW,
    POSE_LANDMARKS.RIGHT_SHOULDER,
    poseLandmarks
  ).angleXY;
  if (Math.abs(rightArmAngle) <= 90) {
    return true;
  }
  return false;
};

// 1-1.
export const LeftHandLeftPunch: Instruction = {
  title: 'Left Hand Left Punch',
  icon: BsArrowLeftCircleFill,
  detectStartFunction: detectLeftArmPunchReady,
  detectEndFunction: (poseLandmarks: NormalizedLandmarkList) => {
    if (!minimumVisibilityCheck(poseLandmarks, [
      POSE_LANDMARKS.LEFT_WRIST,
      POSE_LANDMARKS.LEFT_ELBOW,
      POSE_LANDMARKS.LEFT_SHOULDER,
    ])) {
      return false;
    }
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
    if (!minimumVisibilityCheck(poseLandmarks, [
      POSE_LANDMARKS.LEFT_WRIST,
      POSE_LANDMARKS.LEFT_ELBOW,
      POSE_LANDMARKS.LEFT_SHOULDER,
    ])) {
      return false;
    }
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
};

// 2-1.
export const RightHandLeftPunch: Instruction = {
  title: 'Right Hand Left Punch',
  icon: BsArrowLeftCircleFill,
  detectStartFunction: detectRightArmPunchReady,
  detectEndFunction: (poseLandmarks: NormalizedLandmarkList) => {
    if (!minimumVisibilityCheck(poseLandmarks, [
      POSE_LANDMARKS.RIGHT_WRIST,
      POSE_LANDMARKS.RIGHT_ELBOW,
      POSE_LANDMARKS.RIGHT_SHOULDER,
    ])) {
      return false;
    }
    const rightArmAngle = calculateLandmarkAngleXY_YZ_ZX(
      POSE_LANDMARKS.RIGHT_WRIST,
      POSE_LANDMARKS.RIGHT_ELBOW,
      POSE_LANDMARKS.RIGHT_SHOULDER,
      poseLandmarks
    ).angleXY;
    if (
      Math.abs(rightArmAngle) >= 130 &&
      poseLandmarks[POSE_LANDMARKS.RIGHT_WRIST].x >
        poseLandmarks[POSE_LANDMARKS.RIGHT_SHOULDER].x
    ) {
      return true;
    }
    return false;
  },
};

// 2-2.
export const RightHandRightPunch: Instruction = {
  title: 'Right Hand Right Punch',
  icon: BsArrowLeftCircleFill,
  detectStartFunction: detectRightArmPunchReady,
  detectEndFunction: (poseLandmarks: NormalizedLandmarkList) => {
    if (!minimumVisibilityCheck(poseLandmarks, [
      POSE_LANDMARKS.RIGHT_WRIST,
      POSE_LANDMARKS.RIGHT_ELBOW,
      POSE_LANDMARKS.RIGHT_SHOULDER,
    ])) {
      return false;
    }
    const rightArmAngle = calculateLandmarkAngleXY_YZ_ZX(
      POSE_LANDMARKS.RIGHT_WRIST,
      POSE_LANDMARKS.RIGHT_ELBOW,
      POSE_LANDMARKS.RIGHT_SHOULDER,
      poseLandmarks
    ).angleXY;
    if (
      Math.abs(rightArmAngle) >= 130 &&
      poseLandmarks[POSE_LANDMARKS.RIGHT_WRIST].x <
        poseLandmarks[POSE_LANDMARKS.RIGHT_SHOULDER].x
    ) {
      return true;
    }
    return false;
  },
};

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
