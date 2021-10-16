import {
  NormalizedLandmarkList,
  POSE_LANDMARKS,
  POSE_LANDMARKS_LEFT,
  POSE_LANDMARKS_RIGHT,
} from '@mediapipe/pose';
import { IconType } from 'react-icons';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import { calculateAngleXY } from '../../utils/angles/angle';
import { Vector } from '../../utils/angles/Vector';
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
  minimumVisibility: number = 0.6
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
  if (
    !minimumVisibilityCheck(poseLandmarks, [
      POSE_LANDMARKS.LEFT_WRIST,
      POSE_LANDMARKS.LEFT_ELBOW,
      POSE_LANDMARKS.LEFT_SHOULDER,
    ])
  ) {
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
  if (
    !minimumVisibilityCheck(poseLandmarks, [
      POSE_LANDMARKS.RIGHT_WRIST,
      POSE_LANDMARKS.RIGHT_ELBOW,
      POSE_LANDMARKS.RIGHT_SHOULDER,
    ])
  ) {
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

const detectLeftLegKickReady = (poseLandmarks: NormalizedLandmarkList) => {
  if (
    !minimumVisibilityCheck(poseLandmarks, [
      POSE_LANDMARKS_LEFT.LEFT_KNEE,
      POSE_LANDMARKS.LEFT_HIP,
    ])
  ) {
    return false;
  }
  const leftLegVector: Vector = {
    x:
      poseLandmarks[POSE_LANDMARKS_LEFT.LEFT_KNEE].x -
      poseLandmarks[POSE_LANDMARKS.LEFT_HIP].x,
    y:
      poseLandmarks[POSE_LANDMARKS_LEFT.LEFT_KNEE].y -
      poseLandmarks[POSE_LANDMARKS.LEFT_HIP].y,
    z:
      poseLandmarks[POSE_LANDMARKS_LEFT.LEFT_KNEE].z -
      poseLandmarks[POSE_LANDMARKS.LEFT_HIP].z,
  };
  const leftLegAngle = calculateAngleXY(leftLegVector) - 90;
  if (Math.abs(leftLegAngle) < 30) {
    return true;
  }
  return false;
};

const detectRightLegKickReady = (poseLandmarks: NormalizedLandmarkList) => {
  if (
    !minimumVisibilityCheck(poseLandmarks, [
      POSE_LANDMARKS_RIGHT.RIGHT_KNEE,
      POSE_LANDMARKS.RIGHT_HIP,
    ])
  ) {
    return false;
  }
  const rightLegVector: Vector = {
    x:
      poseLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_KNEE].x -
      poseLandmarks[POSE_LANDMARKS.RIGHT_HIP].x,
    y:
      poseLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_KNEE].y -
      poseLandmarks[POSE_LANDMARKS.RIGHT_HIP].y,
    z:
      poseLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_KNEE].z -
      poseLandmarks[POSE_LANDMARKS.RIGHT_HIP].z,
  };
  const rightLegAngle = calculateAngleXY(rightLegVector) - 90;
  if (Math.abs(rightLegAngle) < 30) {
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
    if (
      !minimumVisibilityCheck(poseLandmarks, [
        POSE_LANDMARKS.LEFT_WRIST,
        POSE_LANDMARKS.LEFT_ELBOW,
        POSE_LANDMARKS.LEFT_SHOULDER,
      ])
    ) {
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
    if (
      !minimumVisibilityCheck(poseLandmarks, [
        POSE_LANDMARKS.LEFT_WRIST,
        POSE_LANDMARKS.LEFT_ELBOW,
        POSE_LANDMARKS.LEFT_SHOULDER,
      ])
    ) {
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
    if (
      !minimumVisibilityCheck(poseLandmarks, [
        POSE_LANDMARKS.RIGHT_WRIST,
        POSE_LANDMARKS.RIGHT_ELBOW,
        POSE_LANDMARKS.RIGHT_SHOULDER,
      ])
    ) {
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
  icon: BsArrowRightCircleFill,
  detectStartFunction: detectRightArmPunchReady,
  detectEndFunction: (poseLandmarks: NormalizedLandmarkList) => {
    if (
      !minimumVisibilityCheck(poseLandmarks, [
        POSE_LANDMARKS.RIGHT_WRIST,
        POSE_LANDMARKS.RIGHT_ELBOW,
        POSE_LANDMARKS.RIGHT_SHOULDER,
      ])
    ) {
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

// 3-1.
export const LeftLegLeftKick: Instruction = {
  title: 'Left Leg Left Kick',
  icon: BsArrowLeftCircleFill,
  detectStartFunction: detectLeftLegKickReady,
  detectEndFunction: (poseLandmarks: NormalizedLandmarkList) => {
    if (
      !minimumVisibilityCheck(poseLandmarks, [
        POSE_LANDMARKS_LEFT.LEFT_KNEE,
        POSE_LANDMARKS.LEFT_HIP,
      ])
    ) {
      return false;
    }
    const leftLegVector: Vector = {
      x:
        poseLandmarks[POSE_LANDMARKS_LEFT.LEFT_KNEE].x -
        poseLandmarks[POSE_LANDMARKS.LEFT_HIP].x,
      y:
        poseLandmarks[POSE_LANDMARKS_LEFT.LEFT_KNEE].y -
        poseLandmarks[POSE_LANDMARKS.LEFT_HIP].y,
      z:
        poseLandmarks[POSE_LANDMARKS_LEFT.LEFT_KNEE].z -
        poseLandmarks[POSE_LANDMARKS.LEFT_HIP].z,
    };
    const leftLegAngle = calculateAngleXY(leftLegVector) - 90;
    if (
      Math.abs(leftLegAngle) > 60 &&
      poseLandmarks[POSE_LANDMARKS_LEFT.LEFT_KNEE].x >
        poseLandmarks[POSE_LANDMARKS.LEFT_HIP].x
    ) {
      return true;
    }
    return false;
  },
};

// 3-2.
export const LeftLegRightKick: Instruction = {
  title: 'Left Leg Right Kick',
  icon: BsArrowRightCircleFill,
  detectStartFunction: detectLeftLegKickReady,
  detectEndFunction: (poseLandmarks: NormalizedLandmarkList) => {
    if (
      !minimumVisibilityCheck(poseLandmarks, [
        POSE_LANDMARKS_LEFT.LEFT_KNEE,
        POSE_LANDMARKS.LEFT_HIP,
      ])
    ) {
      return false;
    }
    const leftLegVector: Vector = {
      x:
        poseLandmarks[POSE_LANDMARKS_LEFT.LEFT_KNEE].x -
        poseLandmarks[POSE_LANDMARKS.LEFT_HIP].x,
      y:
        poseLandmarks[POSE_LANDMARKS_LEFT.LEFT_KNEE].y -
        poseLandmarks[POSE_LANDMARKS.LEFT_HIP].y,
      z:
        poseLandmarks[POSE_LANDMARKS_LEFT.LEFT_KNEE].z -
        poseLandmarks[POSE_LANDMARKS.LEFT_HIP].z,
    };
    const leftLegAngle = calculateAngleXY(leftLegVector) - 90;
    if (
      Math.abs(leftLegAngle) > 60 &&
      poseLandmarks[POSE_LANDMARKS_LEFT.LEFT_KNEE].x <
        poseLandmarks[POSE_LANDMARKS.LEFT_HIP].x
    ) {
      return true;
    }
    return false;
  },
};

export const RightLegLeftKick: Instruction = {
  title: 'Right Leg Left Kick',
  icon: BsArrowLeftCircleFill,
  detectStartFunction: detectRightLegKickReady,
  detectEndFunction: (poseLandmarks: NormalizedLandmarkList) => {
    if (
      !minimumVisibilityCheck(poseLandmarks, [
        POSE_LANDMARKS_RIGHT.RIGHT_KNEE,
        POSE_LANDMARKS.RIGHT_HIP,
      ])
    ) {
      return false;
    }
    const rightLegVector: Vector = {
      x:
        poseLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_KNEE].x -
        poseLandmarks[POSE_LANDMARKS.RIGHT_HIP].x,
      y:
        poseLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_KNEE].y -
        poseLandmarks[POSE_LANDMARKS.RIGHT_HIP].y,
      z:
        poseLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_KNEE].z -
        poseLandmarks[POSE_LANDMARKS.RIGHT_HIP].z,
    };
    const rightLegAngle = calculateAngleXY(rightLegVector) - 90;
    if (
      Math.abs(rightLegAngle) > 60 &&
      poseLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_KNEE].x >
        poseLandmarks[POSE_LANDMARKS.RIGHT_HIP].x
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
