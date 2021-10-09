import { NormalizedLandmark } from '@mediapipe/pose';
import { Vector } from './Vector';
import { Rotations } from './Rotation';
import { angleSubtraction, calculateAngleXY, calculateAngleYZ, calculateAngleZX } from './angle';

const transformLandmarksToVector = (
  startLandmark: NormalizedLandmark,
  endLandmark: NormalizedLandmark
): Vector => {
  return {
    x: endLandmark.x - startLandmark.x,
    y: endLandmark.y - startLandmark.y,
    z: endLandmark.z - startLandmark.z,
  };
};

export const calculateLandmarkAngleXY_YZ_ZX = (
  moveLandmark: number,
  midLandmark: number,
  baseLandmark: number,
  poseLandmarks: NormalizedLandmark[]
) => {
  const moveVector = transformLandmarksToVector(
    poseLandmarks[midLandmark],
    poseLandmarks[moveLandmark]
  );
  const baseVector = transformLandmarksToVector(
    poseLandmarks[midLandmark],
    poseLandmarks[baseLandmark]
  );

  const moveVectorRotations: Rotations = {
    rotationXY: calculateAngleXY(moveVector),
    rotationYZ: calculateAngleYZ(moveVector),
    rotationZX: calculateAngleZX(moveVector)
  };
  const baseVectorRotations: Rotations = {
    rotationXY: calculateAngleXY(baseVector),
    rotationYZ: calculateAngleYZ(baseVector),
    rotationZX: calculateAngleZX(baseVector)
  };

  return {
    angleXY: angleSubtraction(baseVectorRotations.rotationXY, moveVectorRotations.rotationXY),
    angleYZ: angleSubtraction(baseVectorRotations.rotationYZ, moveVectorRotations.rotationYZ),
    angleZX: angleSubtraction(baseVectorRotations.rotationZX, moveVectorRotations.rotationZX)   
  }
};
