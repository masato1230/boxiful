import { useTypedSelector } from '../../hooks/useTypedSelector';

const ResultDetail = () => {
  // reducer
  const { menu, instructions, scores } = useTypedSelector((state) => {
    return state.training;
  });

  return <div>
    <div className="w-2/6">1</div>
    <div className="w-2/6">2</div>
    <div className="w-2/6">3</div>
  </div>;
};

export default ResultDetail;
