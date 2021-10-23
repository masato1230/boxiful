import { useTypedSelector } from "../hooks/useTypedSelector";

const Result = () => {
  const { menu, instructions, scores } = useTypedSelector((state) => {
    return state.training;
  });
  

  return <div>Result</div>;
};

export default Result;