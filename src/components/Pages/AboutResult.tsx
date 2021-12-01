import PageSection from './PageSection';
import SlideBackground from '../backgrounds/SlideBackground';
import resultDescriptionThumbnail from '../../images/resultDescriptionThumbnail.png';

const AboutResult = () => {
  return (
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
                alt="パンチしている画像"
                className="h-36 md:h-72 object-contain"
              />
            </div>
            <div>
              <p>
                　パンチの判定では、パンチを繰り出す前にちゃんと腕を曲げることができているかという点と、パンチをした時にちゃんと腕が伸びているかという点を判定しています。
              </p>
              <p>
                　上手く判定されないと思った時は、これら２つの点を意識してみてください。
              </p>
              <p>
                　パンチやキックの合間は両手を胸の前で構えてブロックする体制を整え、すぐにパンチを繰り出せるようにするのがポイントです。
              </p>
            </div>
          </div>
        </PageSection>
        {/* ボクシフル年齢 */}
        <PageSection sectionTitle="ボクシフル年齢"></PageSection>
        {/* 評価点について */}
        <PageSection sectionTitle="評価点について"></PageSection>
      </div>
      <SlideBackground />
    </div>
  );
};

export default AboutResult;
