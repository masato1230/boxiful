import { useEffect, useRef } from 'react';
import './IntervalInformation.css';
import Interval from '../../../models/menu/Interval';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import Timer from './Timer';

const IntervalInformation = () => {
  // Redux - get actionCreators adn states
  const {
    setMenu,
    setInstructions,
    pushScore,
    pushSeriesScore,
    resetScores,
    setMenuIndex,
  } = useActions();
  const { seriesMenu, menuIndex, seriesTrainingScores, instructions, scores } =
    useTypedSelector((state) => {
      return {
        seriesMenu: state.seriesTraining.seriesMenu,
        menuIndex: state.seriesTraining.menuIndex,
        seriesTrainingScores: state.seriesTraining.seriesTrainingScores,
        instructions: state.training.instructions,
        scores: state.training.scores,
      };
    });

  // Interval
  const interval = seriesMenu.menus[menuIndex] as Interval;

  return (
    <div className="h-full w-full text-white">
      {/* Interval Title */}
      <div className="h-1/6 flex items-end justify-center">
        <h2 className="text-3xl md:text-5xl text-center font-bold">
          休憩
          {/* <p>休憩</p> */}
          {/* {interval.durationMinutes > 0 ? `${interval.durationMinutes}:` : '00:'}
          {interval.durationSeconds > 0
            ? interval.durationSeconds > 10
              ? interval.durationSeconds.toString()
              : `0${interval.durationSeconds}`
            : '00'} */}
        </h2>
      </div>
      <div className="w-min mx-auto h-1/2 flex items-center">
        <Timer onTimesUpCallBack={() => setMenuIndex(menuIndex+1)} />
      </div>
    </div>
  );
};

export default IntervalInformation;
