import { NormalizedLandmarkList } from "@mediapipe/pose";
import { useState } from "react";
import PerformanceMonitor from "./PerformanceMonitor";
import PoseEstimation from "./PoseEstimation";

const Training = () => {
  const [poseLandmarks, setPoseLandmarks] = useState<NormalizedLandmarkList>();
  return (
    <div className="container mx-auto flex h-screen py-1">
      <div className="bg-yellow-500 w-1/2 mx-3 rounded-xl">
        <PerformanceMonitor/>
      </div>
      <div className="w-1/2 mx-3 rounded-xl">
        <PoseEstimation setPoseLandmarks={setPoseLandmarks} />
      </div>
    </div>
  );
};

export default Training;