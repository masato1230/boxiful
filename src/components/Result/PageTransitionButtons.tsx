import { useActions } from "../../hooks/useActions";
import { useHistory } from "react-router";
import { createInstructionsFromMenu } from "../../state";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useReload } from "../../hooks/useReload";

const PageTransitionButtons = () => {
  // reducer
  // reducer
  const { menu } = useTypedSelector((state) => {
    return state.training;
  });
  const { setInstructions, resetScores } = useActions();
  const backToDashboard = useReload();

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
      <button
        className="block w-full md:w-1/2 bg-yellow-500 hover:bg-yellow-700 text-white text-center py-2 px-3 rounded text-sm mt-5 mx-1"
        onClick={backToDashboard}
      >
        ダッシュボードに戻る
      </button>
      <button
        className="block w-full md:w-1/2 bg-gray-500 hover:bg-gray-700 text-white text-center py-2 px-3 rounded text-sm mt-5 mx-1"
        onClick={onAgainClick}
      >
        もう一度同じメニュー
      </button>
    </div>
  );
};

export default PageTransitionButtons;
