import React, { useEffect, useRef } from 'react';
import {
  Pose,
  Results,
  POSE_CONNECTIONS,
  NormalizedLandmarkList,
  POSE_LANDMARKS_LEFT,
  POSE_LANDMARKS_RIGHT,
  POSE_LANDMARKS_NEUTRAL,
} from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import './PoseEstimation.css';
import { calculateLandmarkAngleXY_YZ_ZX } from '../../utils/angles/landmarkAngle';

interface PoseEstimationProps {
  setPoseLandmarks: React.Dispatch<
    React.SetStateAction<NormalizedLandmarkList | undefined>
  >;
}

const PoseEstimation: React.FC<PoseEstimationProps> = ({
  setPoseLandmarks,
}) => {
  const videoRef = useRef<any>();
  const canvasRef = useRef<any>();

  const onResults = (results: Results) => {
    const canvasCtx = canvasRef.current.getContext('2d');
    canvasCtx.save();
    canvasCtx.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    // Only overwrite existing pixels.
    canvasCtx.globalCompositeOperation = 'source-in';
    canvasCtx.fillStyle = '#00FF00';
    canvasCtx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Only overwrite missing pixels.
    canvasCtx.globalCompositeOperation = 'destination-atop';
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    if (!results.poseLandmarks) {
      return;
    }

    canvasCtx.globalCompositeOperation = 'source-over';

    const extraFaceLandmarkIndexes = [
      POSE_LANDMARKS_LEFT.LEFT_EYE,
      POSE_LANDMARKS_LEFT.LEFT_EYE_INNER,
      POSE_LANDMARKS_LEFT.LEFT_EYE_OUTER,
      POSE_LANDMARKS_LEFT.LEFT_EAR,
      POSE_LANDMARKS_LEFT.LEFT_RIGHT,
      POSE_LANDMARKS_RIGHT.RIGHT_EYE,
      POSE_LANDMARKS_RIGHT.RIGHT_EYE_INNER,
      POSE_LANDMARKS_RIGHT.RIGHT_EYE_OUTER,
      POSE_LANDMARKS_RIGHT.RIGHT_EAR,
      POSE_LANDMARKS_RIGHT.RIGHT_LEFT,
    ];

    const gatheredLandmarks = results.poseLandmarks.map((value, index) => {
      if (extraFaceLandmarkIndexes.includes(index)) {
        return results.poseLandmarks[POSE_LANDMARKS_NEUTRAL.NOSE];
      }
      return value;
    });
    drawConnectors(canvasCtx, gatheredLandmarks, POSE_CONNECTIONS, {
      color: '#FFFFFF',
      lineWidth: 2,
      visibilityMin: 0.5,
    });
    drawLandmarks(canvasCtx, gatheredLandmarks, {
      color: '#F59E0B',
      lineWidth: 1,
      visibilityMin: 0.5,
    });
    canvasCtx.restore();

    // update Training Component's landmarks
    setPoseLandmarks(results.poseWorldLandmarks);

    // console.log(
    //   calculateLandmarkAngleXY_YZ_ZX(12, 11, 13, results.poseWorldLandmarks)
    // );
    // console.log(results.poseWorldLandmarks);

    return;
  };

  // setup
  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      },
    });
    pose.setOptions({
      modelComplexity: 0,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    pose.onResults(onResults);

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await pose.send({ image: videoRef.current });
      },
      width: 1280,
      height: 720,
    });
    camera.start();
  }, []);

  return (
    <div className="bg-gray-500 rounded-xl h-screen">
      <video ref={videoRef} className="hidden"></video>
      <canvas
        className="rounded-xl border-yellow-500 border-4"
        ref={canvasRef}
        width="1280px"
        height="720px"
      ></canvas>
      <div></div>
    </div>
  );
};

export default PoseEstimation;
