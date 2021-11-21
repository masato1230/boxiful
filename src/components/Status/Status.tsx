import { useEffect } from 'react';
import React from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { createInstructionsFromMenu } from '../../state';
import MenuCards from './MenuCards';
import CalendarHeatmapContainer from './CalendarHeatmapContainer';
import { useIsLoggedIn } from '../../hooks/useIsLoggedIn';

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
      <div className="container mx-auto px-5 md:px-10">
        {isLoggedIn && <CalendarHeatmapContainer />}
        <MenuCards />
      </div>
    </React.Fragment>
  );
};

export default Status;
