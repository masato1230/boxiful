import { NormalizedLandmarkList } from '@mediapipe/pose';
import { useState, Fragment } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import FinishModal from '../Training/FinishModal';
import PoseEstimation from '../Training/PoseEstimation';
import WarningModal from '../Training/WarningModal';
import IntervalInformation from './IntervalInformation';
import Menu from '../../models/menu';
import TrainingInformation from './TrainingInformation';

const SeriesTraining = () => {
  // Redux states
  const { seriesMenu, menuIndex, scores } = useTypedSelector((state) => {
    return {
      seriesMenu: state.seriesTraining.seriesMenu,
      menuIndex: state.seriesTraining.menuIndex,
      scores: state.seriesTraining.scores,
    };
  });

  // Own States
  const [poseLandmarks, setPoseLandmarks] = useState<NormalizedLandmarkList>();
  const [isShowFinishModal, setIsShowFinishModal] = useState(false);
  // device check result modal
  const [isShowNotWorkOsModal, setIsShowNotWorkOsModal] = useState(false);
  const [isShowTooSmallModal, setIsShowTooSmallModal] = useState(false);

  return (
    <Fragment>
      {isShowFinishModal && <FinishModal />}
      {isShowNotWorkOsModal && (
        <WarningModal
          setIsShowWarningModal={setIsShowNotWorkOsModal}
          message="申し訳ありません。ご利用の端末(ios)にAIが対応していないのでうまく動作しない可能性があります。PCでのご利用をお勧めします。"
          colorClass="red-500"
        />
      )}
      {isShowTooSmallModal && (
        <WarningModal
          setIsShowWarningModal={setIsShowTooSmallModal}
          message="申し訳ありません。ご利用の端末の画面幅だと表示が崩れる可能性があります。PCでのご利用をおすすめします。"
          colorClass="yellow-500"
        />
      )}
      <div className="mx-auto flex h-screen my-5 px-4 relative">
        {/* Information */}
        <div className="bg-white inset-0 md:w-1/2 mx-2 h-5/6 absolute md:relative z-10 bg-transparent bg-opacity-0 text-white md:text-black">
          {(seriesMenu.menus[menuIndex] as Menu).instructionTypes !==
          undefined ? (
            <TrainingInformation />
          ) : (
            <IntervalInformation />
          )}
        </div>
        {/* Pose estimation */}
        <div className="w-full md:w-1/2 mx-2 rounded-xl h-5/6">
          <PoseEstimation setPoseLandmarks={setPoseLandmarks} />
        </div>
      </div>
    </Fragment>
  );
};

export default SeriesTraining;
