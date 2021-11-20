import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
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
import { raisePoseEstimationPositionWarnings } from '../../utils/warnings';
import './PoseEstimation.css';
import { useReload } from '../../hooks/useReload';

interface PoseEstimationProps {
  setPoseLandmarks: React.Dispatch<
    React.SetStateAction<NormalizedLandmarkList | undefined>
  >;
}

const PoseEstimation: React.FC<PoseEstimationProps> = ({
  setPoseLandmarks,
}) => {
  const [isMediaPipeLoading, setIsMediaPipeLoading] = useState(true);
  const [warning, setWarning] = useState<string | null>(null);
  const backToDashboard = useReload();
  const videoRef = useRef<any>();
  const canvasRef = useRef<any>();

  const onResults = (results: Results) => {
    if (isMediaPipeLoading) {
      setIsMediaPipeLoading(false);
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
      lineWidth: 4,
      visibilityMin: 0.5,
    });
    drawLandmarks(canvasCtx, gatheredLandmarks, {
      color: '#F59E0B',
      lineWidth: 2,
      visibilityMin: 0.5,
    });
    canvasCtx.restore();

    // update Training Component's landmarks
    setPoseLandmarks(results.poseWorldLandmarks);
    // warning check
    const warning = raisePoseEstimationPositionWarnings(results.poseLandmarks);
    setWarning(warning);
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

    // refresh when browserback
    window.addEventListener('popstate', backToDashboard);

    // clean up
    return () => {
      pose.close();
      window.removeEventListener('popstate', backToDashboard);
    }
  }, []);

  return (
    <div className="bg-gray-500 rounded-xl h-full border-yellow-500 border-4">
      <video id="video" ref={videoRef} className="hidden"></video>
      {isMediaPipeLoading ? (
        <React.Fragment>
          <div className="h-full flex">
            <div className="p-5 m-auto">
              <AiOutlineLoading3Quarters
                className="animate-spin mx-auto"
                color="white"
                size="200"
              />
              <div className="text-3xl text-center text-white mt-20">
                Loading...
              </div>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="h-full w-full relative">
            <canvas
              className="pose-estimation-canvas object-cover rounded-xl h-full w-full"
              ref={canvasRef}
              width="1280px"
              height="720px"
            >
            </canvas>
          {warning && <div className="absolute bottom-0  bg-black bg-opacity-70 rounded-b-xl w-full text-2xl md:text-5xl text-white p-10">{warning}</div>}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default PoseEstimation;
