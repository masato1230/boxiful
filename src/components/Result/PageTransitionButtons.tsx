import { Link } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useHistory } from "react-router";
import { createInstructionsFromMenu } from "../../state";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const PageTransitionButtons = () => {
  // reducer
  // reducer
  const { menu } = useTypedSelector((state) => {
    return state.training;
  });
  const { setInstructions, resetScores } = useActions();

  const history = useHistory();

  const onAgainClick = () => {
    // reset instructions and scores in reducer
    setInstructions(createInstructionsFromMenu(menu));
    resetScores();
    // redirect to training page
    history.push('/training');
  };

  return (
    <div className="flex">
      <Link
        className="w-1/2 bg-yellow-500 hover:bg-yellow-700 text-white text-center py-2 px-3 rounded text-sm my-5 mx-1"
        to="/"
      >
        ダッシュボードに戻る
      </Link>
      <div
        className="w-1/2 bg-gray-500 hover:bg-gray-700 text-white text-center py-2 px-3 rounded text-sm my-5 mx-1"
        onClick={onAgainClick}
      >
        もう一度同じメニュー
      </div>
    </div>
  );
};

export default PageTransitionButtons;
