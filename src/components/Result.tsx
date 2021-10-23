import { useTypedSelector } from "../hooks/useTypedSelector";
import { calculateResultScore } from "../utils/scores";

const Result = () => {
  const { menu, instructions, scores } = useTypedSelector((state) => {
    return state.training;
  });

  console.log(menu);
  console.log(instructions);
  console.log(scores);

  return <div>
    <p>Result</p>
    <p>score: {calculateResultScore(scores)}</p>
  </div>;
};

export default Result;