export interface Vector {
  x: number;
  y: number;
  z: number;
}

export const calculateDot = (vector1: Vector, vector2: Vector) => {
  return vector1.x * vector2.x + vector1.y * vector2.y + vector1.z * vector2.z;
};

export const calculateLength = (vector: Vector) => {
  return Math.sqrt(vector.x ** 2 + vector.y ** 2 + vector.z ** 2);
}

export const calculateCos = (vector1: Vector, vector2: Vector) => {
  return calculateDot(vector1, vector2) / (calculateLength(vector1) * calculateLength(vector2));
}
