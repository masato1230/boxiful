import { useEffect } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { createInstructionsFromMenu, EasyMenu } from "../state";

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

  // TODO: delete set menu and instructions for training test 
  // set menu
  useEffect(() => {
    setMenu(EasyMenu);
  }, []);

  // set instructions
  useEffect(() => {
    if (menu) {
      setInstructions(createInstructionsFromMenu(menu));
    }
  }, [menu]);

  return <div>Status Component</div>
};

export default Status;