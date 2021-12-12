import React from 'react';
import Menu from '../../../models/menu';
import Interval from '../../../models/menu/Interval';

interface IntervalMenuCardProps {
  index: number;
  interval: Interval;
  isNowTraining: boolean;
}

const IntervalMenuCard: React.FC<IntervalMenuCardProps> = ({ index, interval, isNowTraining }) => {
  return (
    <div className="series-menu-card h-full w-72 my-2 mx-2 whitespace-normal">
      <div className="series-menu-box duration-300 transform hover:-translate-y-4">
        <div className="series-menu-content">
          {/* Menu index */}
          {index > 10 ? <h2>index</h2> : <h2>{`0${index}`}</h2>}
          {/* Interval title */}
          <h3>インターバル</h3>
          {/* Interval Description */}
          <p className="max-w-1/4">
            {interval.durationMinutes > 0 && `${interval.durationMinutes}分`}
            {interval.durationSeconds > 0 && `${interval.durationSeconds}秒`}
            の休憩
          </p>
          <a href="#">Read More</a>
        </div>
      </div>
    </div>
  );
};

export default IntervalMenuCard;
