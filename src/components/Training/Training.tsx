import PerformanceMonitor from "./PerformanceMonitor";
import PoseEstimation from "./PoseEstimation";

const Training = () => {
  return (
    <div className="container px-5 grid grid-cols-2">
      <div className="bg-gray-500 mx-5">
        <PerformanceMonitor/>
      </div>
      <div className="bg-yellow-500 mx-5">
        <PoseEstimation/>
      </div>
    </div>
  );
};

export default Training;