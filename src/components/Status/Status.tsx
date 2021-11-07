import { useEffect } from 'react';
import { useActions } from '../../hooks/useActions';
import { useTrainingResult } from '../../hooks/useTrainingResults';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import {
  createInstructionsFromMenu,
  EasyMenu,
  HardMenu,
  NormalMenu,
} from '../../state';
import MenuCards from './MenuCards';
import CalendarHeatmapContainer from './CalendarHeatmapContainer';
import { useIsLoggedIn } from '../../hooks/useIsLoggedIn';

const Status = () => {
  // Redux - get actionCreators adn states
  const { setMenu, setInstructions, pushScore } = useActions();
  const { menu, instructions, scores } = useTypedSelector((state) => {
    return {
      menu: state.training.menu,
      instructions: state.training.instructions,
      scores: state.training.scores,
    };
  });

  // Custom Hooks
  const [isLoggedIn, logout] = useIsLoggedIn();

  // set instructions
  useEffect(() => {
    if (menu) {
      setInstructions(createInstructionsFromMenu(menu));
    }
  }, [menu]);

  return (
    <div className="container mx-auto px-3">
      {isLoggedIn && <CalendarHeatmapContainer />}
      <MenuCards />
    </div>
  );
};

export default Status;
