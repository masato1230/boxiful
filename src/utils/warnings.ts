import { NormalizedLandmarkList, POSE_LANDMARKS, POSE_LANDMARKS_LEFT, POSE_LANDMARKS_NEUTRAL, POSE_LANDMARKS_RIGHT } from "@mediapipe/pose";
import { LeftHandRightPunch } from "../components/Training/Instructions";

const essentialLandmarkIndexes: number[] = [
  POSE_LANDMARKS_NEUTRAL.NOSE,
  POSE_LANDMARKS_LEFT.LEFT_SHOULDER,
  POSE_LANDMARKS_LEFT.LEFT_HIP,
  POSE_LANDMARKS_RIGHT.RIGHT_SHOULDER,
  POSE_LANDMARKS_RIGHT.RIGHT_HIP,
]

export const raisePoseEstimationPositionWarnings = (poseLandmarks: NormalizedLandmarkList): string | null => {
  let warningMessage = null;
  essentialLandmarkIndexes.forEach((landmarkIndex) => {
    const landmark = poseLandmarks[landmarkIndex];
    if (landmark.x > 1 || landmark.x < 0 || landmark.y > 1 || landmark.y < 0) {
      warningMessage = 'カメラに体全体が映るようにしてください。';
    }
  })
  return warningMessage;
}