import { NormalizedLandmarkList } from '@mediapipe/pose';
import { useState, Fragment, useEffect } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import FinishModal from '../Training/FinishModal';
import SeriesTrainingPoseEstimation from './SeriesTrainingPoseEstimation';
import WarningModal from '../Training/WarningModal';
import IntervalInformation from './IntervalInformation';
import Menu from '../../models/menu';
import TrainingInformation from './TrainingInformation/TrainingInformation';
import { useActions } from '../../hooks/useActions';
import { testSeriesMenu } from '../../models/menu/SeriesMenu';
import SeriesMenuCards from './SeriesMenuCards/SeriesMenuCards';

const SeriesTraining = () => {
  // Redux states
  const { setSeriesMenu, setMenuIndex, setMenu, setInstructions } =
    useActions();
  const { seriesMenu, menuIndex, seriesTrainingScores } = useTypedSelector(
    (state) => {
      return {
        seriesMenu: state.seriesTraining.seriesMenu,
        menuIndex: state.seriesTraining.menuIndex,
        seriesTrainingScores: state.seriesTraining.seriesTrainingScores,
      };
    }
  );

  // Own States
  const [poseLandmarks, setPoseLandmarks] = useState<NormalizedLandmarkList>();
  const [isShowFinishModal, setIsShowFinishModal] = useState(false);
  // device check result modal
  const [isShowNotWorkOsModal, setIsShowNotWorkOsModal] = useState(false);
  const [isShowTooSmallModal, setIsShowTooSmallModal] = useState(false);

  // TODO: delete test setup
  useEffect(() => {
    setSeriesMenu(testSeriesMenu);
    setMenuIndex(0);
  }, []);

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
      {/* clickable components */}
      <div className="min-h-screen">
        <div className="absolute w-full h-full bg-black" style={{ zIndex: -100 }}></div>
        {/* menu cards */}
        <div className="h-1/4 absolute bottom-0">
          <SeriesMenuCards />
        </div>
      </div>
      {/* not clickable components */}
      <div
        className="flex h-screen absolute top-0 bottom-0 w-screen"
        style={{ zIndex: -1 }}
      >
        {/* Information */}
        <div className="bg-black inset-0 md:w-1/2 h-screen absolute md:relative z-10 md:text-black">
          {(seriesMenu.menus[menuIndex] as Menu).instructionTypes !==
          undefined ? (
            <TrainingInformation poseLandmarks={poseLandmarks} />
          ) : (
            <IntervalInformation />
          )}
        </div>
        {/* Pose estimation */}
        <div className="w-full md:w-1/2 h-screen">
          <SeriesTrainingPoseEstimation setPoseLandmarks={setPoseLandmarks} />
        </div>
      </div>
    </Fragment>
  );
};

export default SeriesTraining;
