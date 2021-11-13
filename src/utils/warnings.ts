import { NormalizedLandmarkList, POSE_LANDMARKS_LEFT, POSE_LANDMARKS_NEUTRAL, POSE_LANDMARKS_RIGHT } from "@mediapipe/pose";

const essentialLandmarkIndexes: number[] = [
  POSE_LANDMARKS_NEUTRAL.NOSE,
  POSE_LANDMARKS_LEFT.LEFT_SHOULDER,
  POSE_LANDMARKS_LEFT.LEFT_HIP,
  POSE_LANDMARKS_RIGHT.RIGHT_SHOULDER,
  POSE_LANDMARKS_RIGHT.RIGHT_HIP,
]

const kneeLandmarkIndexes: number[] = [
  POSE_LANDMARKS_LEFT.LEFT_KNEE,
  POSE_LANDMARKS_RIGHT.RIGHT_KNEE,
]

export const raisePoseEstimationPositionWarnings = (poseLandmarks: NormalizedLandmarkList): string | null => {
  let warningMessage = null;
  // check knee landmark is contained in camera.
  kneeLandmarkIndexes.forEach((landmarkIndex) => {
    const landmark = poseLandmarks[landmarkIndex];
    if (landmark.x > 1 || landmark.x < 0 || landmark.y > 1 || landmark.y < 0) {
      warningMessage = 'カメラに膝が映るようにしてください。';
    }
  });
  
  essentialLandmarkIndexes.forEach((landmarkIndex) => {
    const landmark = poseLandmarks[landmarkIndex];
    if (landmark.x > 1 || landmark.x < 0 || landmark.y > 1 || landmark.y < 0) {
      warningMessage = 'カメラに体全体が映るようにしてください。';
    }
  });

  return warningMessage;
}