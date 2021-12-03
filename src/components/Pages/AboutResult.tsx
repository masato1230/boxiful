import { Fragment } from 'react';
import CustomHead from '../CustomHead'
import PageSection from './PageSection';
import SlideBackground from '../backgrounds/SlideBackground';
import resultDescriptionThumbnail from '../../images/resultDescriptionThumbnail.png';
import pieGraphImage from '../../images/pieGraph.svg';
import scoreChartsImage from '../../images/scoreCharts.png';

const AboutResult = () => {
  return (
    <Fragment>
      <CustomHead title="トレーニング結果について - Boxiful" />
      <div className="container mx-auto px-5 md:px-10 min-h-screen">
        <h1 className="mt-5 mb-2 ml-5 text-3xl font-bold text-yellow-500">
          About Result
        </h1>
        <div>
          {/* トレーニング結果について */}
          <PageSection sectionTitle="トレーニング結果について">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex justify-center items-center flex-wrap">
                <img
                  src={resultDescriptionThumbnail}
                  alt="トレーニング結果"
                  className="max-h-36 md:max-h-72 object-contain"
                />
              </div>
              <div>
                <p>
                  　トレーニングメニューを最後まで行うと、トーレニング結果が表示されます。
                </p>
                <p>
                  　トレーニング結果では、トレーニング中の瞬発力、体力を評価した
                  <span className="font-bold">ボクシフル年齢</span>
                  や、100点満点での評価点、キック・パンチそれぞれの評価点、トレーニングで消費したカロリーが確認できます。
                </p>
                <p>
                  トレーニング結果はLineやTwitterで共有できます。友達や家族に共有してみましょう！
                </p>
              </div>
            </div>
          </PageSection>
          {/* ボクシフル年齢 */}
          <PageSection sectionTitle="ボクシフル年齢">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <p>
                  　ボクシフル年齢はパンチやキックをどれだけ速く繰り出せたかを評価して計算されます。
                </p>
                <p>
                  　あくまで目安の数値で、何らかの統計に基づいてるわけではない点はご了承ください。
                </p>
                <p>
                  メニューの難易度を考慮した数値ではないので、メニューが難しければ難しいほどボクシフル年齢は高くなりやすいです。
                </p>
              </div>
              <div className="flex justify-center items-center flex-wrap">
                <img
                  src={pieGraphImage}
                  alt="円グラフ"
                  className="h-36 md:h-56 object-contain"
                />
              </div>
            </div>
          </PageSection>
          {/* 評価点について */}
          <PageSection sectionTitle="評価点について">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex justify-center items-center flex-wrap">
                <img
                  src={scoreChartsImage}
                  alt="複数の評価点グラフ"
                  className="h-36 md:h-72 object-contain"
                />
              </div>
              <div>
                <p>
                  　全体の評価点と、パンチ・キックそれぞれの評価点を見ることができます。
                </p>
                <p>
                  　パンチとキックどちらかの点数が著しく低いときは、点数が低い方の改善を心がけてトレーニングしてみましょう。
                </p>
                <p>
                  特に、キックに関してはフォームを改善することで大幅に点数が改善できます。フォームを確認してみましょう。
                </p>
                <p>
                  パンチは常にガードをあげるように意識すると点数が改善するかもしれません。
                </p>
              </div>
            </div>
          </PageSection>
        </div>
        <SlideBackground />
      </div>
    </Fragment>
  );
};

export default AboutResult;
