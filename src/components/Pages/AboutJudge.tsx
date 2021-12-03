import { Fragment } from 'react';
import CustomHead from '../CustomHead';
import SlideBackground from '../backgrounds/SlideBackground';
import punchThumbnail from '../../images/punchDescriptionThumbnail.svg';
import kickThumbnail from '../../images/kickDescriptionThumbnail.svg';
import longLoadingThumbnail from '../../images/longLoadingDescriptionThumbnail.svg';
import questionThumbnail from '../../images/questionThumbnail.svg';
import cameraThumbnail from '../../images/cameraDescriptionThumbnail.svg';

const AboutJudge = () => {
  return (
    <Fragment>
      <CustomHead title="パンチ/キックの判定について - Boxiful" />
      <div className="container mx-auto px-5 md:px-10 min-h-screen">
        <h1 className="mt-5 mb-2 ml-5 text-3xl font-bold text-yellow-500">
          About Judge
        </h1>
        {/* パンチの判定について */}
        <section className="mb-10">
          <h2 className="text-xl pt-3 mb-3 font-bold">パンチの判定について</h2>
          <div className="rounded-lg shadow-xl bg-white p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex justify-center items-center flex-wrap">
                <img
                  src={punchThumbnail}
                  alt="パンチしている画像"
                  className="h-36 md:h-56"
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
          </div>
        </section>
        {/* キックの判定について */}
        <section className="mb-10">
          <h2 className="text-xl pt-3 mb-3 font-bold">キックの判定について</h2>
          <div className="rounded-lg shadow-xl bg-white p-6">
            <div className="items-center flex justify-center flex-wrap-reverse">
              <div className="md:w-1/2 px-1">
                <p>
                  　キックの判定では、足を地面に下ろした状態から、足(膝)をしっかりと上まで上げられているかという点を見ています。上手く判定されない時は、足をもっと上にあげてみてください。
                </p>
                <p>
                  　キックをするときは、蹴り出す足と同じ側の腕を振り出しながら蹴るのがポイントです。
                </p>
              </div>
              <img
                className="md:mt-5 object-contain md:w-1/2 px-1 h-36 md:h-56"
                src={kickThumbnail}
                alt="キック"
              />
            </div>
          </div>
        </section>
        {/* ローディングが終わらない時 */}
        <section className="mb-10">
          <h2 className="text-xl pt-3 mb-3 font-bold">
            ローディングが終わらない時
          </h2>
          <div className="rounded-lg shadow-xl bg-white p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex justify-center items-center">
                <img
                  src={longLoadingThumbnail}
                  alt="ローディング画面を眺める男性"
                  className="h-36 md:h-56"
                />
              </div>
              <div>
                <p>
                  　トレーニング画面でローディングがなかなか終わらない場合、三つ理由が考えられます。
                </p>
                <ul className="list-disc list-outside bg-rose-200 ml-10 mb-3">
                  <li>このサイトがカメラを利用するのを禁止している</li>
                  <li>カメラにフィルターなどがかかっていて何も映っていない</li>
                  <li>OSがボクシフルで利用しているAIに対応していない</li>
                </ul>
                <p>
                  　サイトがカメラを利用するのを禁止している場合は、ホーム(ダッシュボード)に戻ってメニュー選択をもう一度してください。メニューを選択すると、このサイトがカメラを利用するのを許可するかどうかのダイアログが表示されるので、許可してください。
                </p>
                <p>
                  　iPhone,
                  iPadといったiOS端末ではAIが上手く動作しない可能性が高いです。また、CPUの性能が低いデバイスでもAIが動作しない可能性が高いです。(将来的にはiOSにも対応していく予定です。)
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* カメラ映像がカクつくとき */}
        <section className="mb-10">
          <h2 className="text-xl pt-3 mb-3 font-bold">
            カメラ映像がカクつくとき
          </h2>
          <div className="rounded-lg shadow-xl bg-white p-6">
            <div className="items-center flex justify-center flex-wrap-reverse">
              <div className="md:w-1/2 px-1">
                <p>
                  　トレーニング中は画像処理を行うためPCのリソースを大量に利用しています。カメラ映像がカクつくときは、開いている他のサイトタブやアプリを閉じてみてください。
                </p>
                <p>
                  　カメラに映るモノを減らすことでもカクつきを軽減できます。背景をできるだけスッキリさせてみてください。
                </p>
              </div>
              <div className="md:w-1/2 px-1">
                <img
                  src={questionThumbnail}
                  alt="パンチしている画像"
                  className="h-36 md:h-56 mb-3"
                />
              </div>
            </div>
          </div>
        </section>
        {/* カメラと画像処理について */}
        <section className="mb-10">
          <h2 className="text-xl pt-3 mb-3 font-bold">
            カメラと画像処理について
          </h2>
          <div className="rounded-lg shadow-xl bg-white p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex justify-center items-center">
                <img
                  src={cameraThumbnail}
                  alt="ローディング画面を眺める男性"
                  className="h-36 md:h-56"
                />
              </div>
              <div>
                <p>
                  　カメラより取得している動画はあなたのデバイスの外部に出ることは一切ございません。
                </p>
                <p>
                  　ボクシフルではブラウザー上で画像を処理するAIを動作させています。AIで画像を処理した後の画像データの保持はいっさい行っていません。
                </p>
                <p>
                  　結果を表示する画面でもカメラが起動している場合がありますが、ホーム(ダッシュボード)に戻るか、サイトをリロードするとカメラをオフにできます。
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <SlideBackground />
    </Fragment>
  );
};

export default AboutJudge;
