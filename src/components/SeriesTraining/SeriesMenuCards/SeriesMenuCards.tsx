import React, { MenuHTMLAttributes } from 'react';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import SeriesMenuCard from './SeriesMenuCard';
import Menu from '../../../models/menu';
import IntervalMenuCard from './IntervalMenuCard';
import Interval from '../../../models/menu/Interval';
import './SeriesMenuCard.css';

interface SeriesMenuCardsProps {
  menuIndex: number;
}

const SeriesMenuCards: React.FC<SeriesMenuCardsProps> = ({ menuIndex }) => {
  // Redux
  const { seriesMenu, seriesTrainingScores } = useTypedSelector((state) => {
    return {
      seriesMenu: state.seriesTraining.seriesMenu,
      seriesTrainingScores: state.seriesTraining.seriesTrainingScores,
    };
  });

  return (
    <div className="text-white h-full ml-5 mb-5">
      <h3>次のメニュー</h3>
      <ul className="overflow-x-scroll whitespace-nowrap h-full flex w-screen">
        {seriesMenu.menus.map((menu, index) => {
          if ((menu as Menu).instructionTypes === undefined) {
            return (
              <li className="h-full inline-block">
                <IntervalMenuCard
                  index={index}
                  interval={menu as Interval}
                  isNowTraining={menuIndex === index}
                />
              </li>
            );
          } else {
            return (
              <li className="h-full inline-block">
                <SeriesMenuCard
                  index={index}
                  menu={menu as Menu}
                  isNowTraining={menuIndex === index}
                />
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default SeriesMenuCards;
