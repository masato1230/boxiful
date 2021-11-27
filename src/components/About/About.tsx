import { Fragment } from 'react';
import SlideBackground from '../backgrounds/SlideBackground';
import { GiBoxingGlove } from 'react-icons/gi';
import './About.css';
import playingImage from '../../images/playing.png';

const About = () => {
  return (
    <Fragment>
      <div className="container mx-auto px-5 md:px-10 min-h-screen">
        <h1 className="mt-5 mb-2 ml-5 text-3xl font-bold text-yellow-500">
          About
        </h1>
        {/* Boxifulについて */}
        <section className="mb-10">
          <h2 className="text-xl pt-3 mb-3 font-bold">Boxifulについて</h2>
          <div className="rounded-lg shadow-xl bg-white p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <h1 className="text-center flex justify-center items-center text-4xl mx-auto">
                <div className="text-yellow-500 pr-2">
                  <GiBoxingGlove />
                </div>
                <span className="font-semibold text-gray-500">
                  Boxi<span className="text-yellow-500">ful</span>
                </span>
              </h1>
              <div>
                <p>　Boxifulはユーザーが自宅で手軽に楽しく運動できることを目的としたWEBベースのキックボクシングゲームです。</p>
                <p>デバイスのフロントカメラから取得した映像を姿勢推定AIで解析することでキックやパンチの判定を行なっています。</p>
                <p>また、アカウントを作成するとトレーニングの実施状況を記録することができ、トレーニングの実施回数や消費カロリーを振り返れます。</p>
                <p>　現在はイージーメニュー・ノーマルメニュー・ハードメニューしかありませんが、今後新しいトレーニングメニューを開発していく予定です。</p>
              </div>
            </div>
          </div>
        </section>

        {/* 基本的なプレイ方法 */}
        <section className="mb-10">
          <h2 className="text-xl pt-3 mb-3 font-bold">基本的なプレイ方法</h2>
          <div className="rounded-lg shadow-xl bg-white p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <p>　ホーム(ダッシュボード)画面でメニューを選択すると、トレーニング画面に移動します。</p>
                <p>　トレーニング画面に初めていくとカメラへのアクセスを許可するかどうかをダイアログにて聞かれるので、許可してください。</p>
                <p>カメラへのアクセスを許可すると、5秒ほどで姿勢推定AIが起動するので、この間に画面から2メートルくらい離れ、体全体がカメラに写るようにしてください。</p>
                <p>画面右側にカメラからの映像に姿勢推定結果を乗せた映像が映し出されるので、体がちゃんとカメラに収まっているか確認してください。</p>
              </div>
              <img className="object-contain" src={playingImage} alt="プレイ画像" />
            </div>
          </div>
        </section>
      </div>
      <SlideBackground />
    </Fragment>
  );
};

export default About;
