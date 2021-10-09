import { calculateCos, Vector } from './Vector';

export const calculateAngleXY = (vector: Vector): number => {
  const baseVectorX: Vector = { x: 1, y: 0, z: 0 };
  const fixedVector = { ...vector, z: 0 };
  const cos = calculateCos(fixedVector, baseVectorX);
  let angle = Math.acos(cos) * 180 / Math.PI;
  angle = vector.y >= 0 ? angle : -angle;
  return angle;
};

export const calculateAngleYZ = (vector: Vector): number => {
  const baseVectorY: Vector = { x: 0, y: 1, z: 0 };
  const fixedVector = { ...vector, x: 0 };
  const cos = calculateCos(fixedVector, baseVectorY);
  let angle = Math.acos(cos) * 180 / Math.PI;
  angle = vector.z >= 0 ? angle : -angle;
  return angle;
}

export const calculateAngleZX = (vector: Vector): number => {
  const baseVectorZ: Vector = { x: 0, y: 0, z: 1 };
  const fixedVector = { ...vector, y: 0 };
  const cos = calculateCos(fixedVector, baseVectorZ);
  let angle = Math.acos(cos) * 180 / Math.PI;
  angle = vector.x >= 0 ? angle : -angle;
  return angle;
}

export const angleSubtraction = (subtractAngle: number, fromAngle: number) => {
  let resultAngle = fromAngle - subtractAngle;
  if (resultAngle > 180) {
    resultAngle -= 360;
  } else if (resultAngle < -180) {
    resultAngle += 360;
  }
  return resultAngle;
}
