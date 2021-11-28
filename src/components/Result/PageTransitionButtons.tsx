import { useActions } from "../../hooks/useActions";
import { useHistory } from "react-router";
import { createInstructionsFromMenu } from "../../state";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useCameraResetReload } from "../../hooks/useCameraResetReload";

const PageTransitionButtons = () => {
  // reducer
  // reducer
  const { menu } = useTypedSelector((state) => {
    return state.training;
  });
  const { setInstructions, resetScores } = useActions();
  const backToDashboard = useCameraResetReload();

  const history = useHistory();

  const onAgainClick = () => {
    // reset instructions and scores in reducer
    setInstructions(createInstructionsFromMenu(menu));
    resetScores();
    // redirect to training page
    history.push('/training');
  };

  return (
    <div className="md:flex">
      <div
        className="block md:w-1/2 bg-yellow-500 hover:bg-yellow-700 text-white text-center py-1 md:py-2 rounded text-xs md:text-sm mt-3 md:mt-5 mx-1"
        onClick={backToDashboard}
      >
        ダッシュボードに戻る
      </div>
      <div
        className="block md:w-1/2 bg-gray-500 hover:bg-gray-700 text-white text-center py-1 md:py-2 rounded text-xs md:text-sm mt-3 md:mt-5 mx-1"
        onClick={onAgainClick}
      >
        もう一度同じメニュー
      </div>
    </div>
  );
};

export default PageTransitionButtons;
