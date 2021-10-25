import { useTypedSelector } from '../../hooks/useTypedSelector';
import { FaFire } from 'react-icons/fa';
import { SiWebmoney } from 'react-icons/si'
import { calculateTotalCalorieFromInstructions } from '../../utils/scores';

const getScoresDistribution = (scores: number[]) => {
  scores.sort();
  const greatScores = scores.sort().filter((score) => {
    return score >= 80;
  });

  const goodScores = scores.sort().filter((score) => {
    return score < 80 && score >= 30;
  });

  return {
    greatCount: greatScores.length,
    goodCount: goodScores.length,
    missCount: scores.length - greatScores.length - goodScores.length,
  };
};

const ResultDetail = () => {
  // reducer
  const { menu, instructions, scores } = useTypedSelector((state) => {
    return state.training;
  });

  const scoreDistribution = getScoresDistribution(scores);

  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg p-5">
        <h1 className="text-xl font-bold">結果詳細</h1>
        <div className="mt-4 mb-2">
          <div className="w-full h-3 rounded-lg bg-gray-500 mt-2 overflow-hidden relative">
            <div
              className="bg-blue-400 h-full rounded-lg shadow-md absolute"
              style={{
                width: `${
                  ((scoreDistribution.goodCount +
                    scoreDistribution.greatCount) /
                    scores.length) *
                  100
                }%`,
              }}
            ></div>
            <div
              className="bg-pink-400 h-full rounded-lg shadow-md absolute"
              style={{
                width: `${
                  (scoreDistribution.greatCount / scores.length) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>
        <h3 className="text-xl text-pink-400 font-middle pl-5">
          Great
          <span className="pl-5 font-semibold">
            {scoreDistribution.greatCount}回
          </span>
        </h3>
        <h3 className="text-xl text-blue-400 font-middle pl-5">
          Good
          <span className="pl-5 font-semibold">
            {scoreDistribution.goodCount}回
          </span>
        </h3>
        <h3 className="text-xl text-gray-500 font-middle pl-5">
          Miss
          <span className="pl-7 font-semibold">
            {scores.length -
              scoreDistribution.goodCount -
              scoreDistribution.greatCount}
            回
          </span>
        </h3>
        <div className="border-1 border my-2"></div>
        <div>
          <FaFire className="text-red-500 inline-block h-12 mx-2" />
          <div className="font-semibold inline-block text-lg">消費カロリー</div>
          <div className="inline-block float-right pt-2">
            {calculateTotalCalorieFromInstructions(instructions)} kcal
          </div>
        </div>
        <div>
          <SiWebmoney className="text-yellow-500 inline-block h-12 mx-2" />
          <div className="font-semibold inline-block text-lg">ポイント</div>
          <div className="inline-block float-right pt-2">
            {Math.round(scores.reduce((acc, cur) => acc + cur, 0) / 10)} ポイント
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDetail;
