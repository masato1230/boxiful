import React from 'react';
import Menu from '../../../models/menu';

interface SeriesMenuCardProps {
  index: number;
  menu: Menu;
  isNowTraining: boolean;
}

const SeriesMenuCard: React.FC<SeriesMenuCardProps> = ({
  index,
  menu,
  isNowTraining,
}) => {
  return (
    <div className="series-menu-card h-full w-72 my-2 mx-2 whitespace-normal">
      <div className="series-menu-box duration-300 transform hover:-translate-y-4">
        <div className="series-menu-content">
          {/* Menu number */}
          {index > 10 ? <h2>{index + 1}</h2> : <h2>{`0${index + 1}`}</h2>}
          {/* Menu title */}
          <h3>{menu.title}</h3>
          {/* Menu description */}
          {/* <p className="max-w-full">{menu.description}</p> */}
          <a className="bg-yellow-500" href="#">Read More</a>
        </div>
      </div>
    </div>
  );
};

export default SeriesMenuCard;
