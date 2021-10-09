import React, { useEffect, useRef } from 'react';
import { Pose, Results, POSE_CONNECTIONS, NormalizedLandmarkList } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import './PoseEstimation.css';
import { calculateLandmarkAngleXY_YZ_ZX } from '../../utils/angles/landmarkAngle';

interface PoseEstimationProps {
  setPoseLandmarks: React.Dispatch<React.SetStateAction<NormalizedLandmarkList | undefined>>
}

const PoseEstimation: React.FC<PoseEstimationProps> = ({ setPoseLandmarks }) => {
  const videoRef = useRef<any>();
  const canvasRef = useRef<any>();

  const onResults = (results: Results) => {
    if (!results.poseLandmarks) {
      return;
    }

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

    canvasCtx.globalCompositeOperation = 'source-over';
    drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
      color: '#FFFFFF',
      lineWidth: 4,
    });
    drawLandmarks(canvasCtx, results.poseLandmarks, {
      color: '#F59E0B',
      lineWidth: 2,
    });
    canvasCtx.restore();
    
    // update Training Component's landmarks
    setPoseLandmarks(results.poseWorldLandmarks);

    console.log(calculateLandmarkAngleXY_YZ_ZX(12, 11, 13, results.poseWorldLandmarks));
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
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: true,
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
