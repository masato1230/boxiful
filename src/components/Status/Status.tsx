import { useEffect } from 'react';
import React from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { createInstructionsFromMenu } from '../../state';
import MenuCards from './MenuCards';
import CalendarHeatmapContainer from './CalendarHeatmapContainer';
import GetStarted from './GetStarted/GetStarted';
import { useIsLoggedIn } from '../../hooks/useIsLoggedIn';
import SlideBackground from '../backgrounds/SlideBackground';

const Status = () => {
  // Redux - get actionCreators adn states
  const { setInstructions } = useActions();
  const { menu } = useTypedSelector((state) => {
    return {
      menu: state.training.menu,
      instructions: state.training.instructions,
      scores: state.training.scores,
    };
  });

  // Custom Hooks
  const { isLoggedIn } = useIsLoggedIn();

  // set instructions
  useEffect(() => {
    if (menu) {
      setInstructions(createInstructionsFromMenu(menu));
    }
  }, [menu, setInstructions]);

  return (
    <React.Fragment>
      <div className="container mx-auto px-5 md:px-10 min-h-screen">
        <h1 className="mt-5 mb-2 ml-5 text-3xl font-bold text-yellow-500">
          {isLoggedIn ? 'Dash Board' : 'メニュー選択'}
        </h1>
        {isLoggedIn ? <CalendarHeatmapContainer /> : <GetStarted />}
        <MenuCards />
      </div>
      <SlideBackground />
    </React.Fragment>
  );
};

export default Status;
