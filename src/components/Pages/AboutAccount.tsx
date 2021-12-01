import { Fragment } from 'react';
import accountCreateMeritThumbnail from '../../images/accountCreateMeritDescriptionThumbnail.png';
import SlideBackground from '../backgrounds/SlideBackground';
import deleteAccountThumbnail from '../../images/deleteAccountDescriptionThumbnail.svg';

const AboutAccount = () => {
  return (
    <Fragment>
      <div className="container mx-auto px-5 md:px-10 min-h-screen">
        <h1 className="mt-5 mb-2 ml-5 text-3xl font-bold text-yellow-500">
          About Acount
        </h1>
        {/* アカウントを作るとできること */}
        <section className="mb-10">
          <h2 className="text-xl pt-3 mb-3 font-bold">
            アカウントを作るとできること
          </h2>
          <div className="rounded-lg shadow-xl bg-white p-6">
            <img
              src={accountCreateMeritThumbnail}
              alt="ヒットマップ"
              className="h-36 md:h-56 object-contain mx-auto"
            />
            <div>
              <p>
                　アカウントを作成するとトレーニングの記録と閲覧ができるようになります。
              </p>
              <p>
                　1年間の消費カロリーやトレーニングの実施回数をダッシュボードで確認できるようになります。トレーニングの記録でモチベーションを上げながらトレーニングを続けましょう。
              </p>
            </div>
          </div>
        </section>
        {/* アカウントの削除方法 */}
        <section className="mb-10">
          <h2 className="text-xl pt-3 mb-3 font-bold">アカウントの削除方法</h2>
          <div className="rounded-lg shadow-xl bg-white p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex justify-center items-center flex-wrap">
                <img
                  src={deleteAccountThumbnail}
                  alt="パンチしている画像"
                  className="h-36 md:h-56"
                />
              </div>
              <div>
                <p>
                  　ログインした状態でページの一番右下にある、「アカウント削除」ボタンを押すとアカウントを削除するための画面に移動するので、そこからアカウントを削除してください。
                </p>
                <p className="text-red-500">
                  注意：アカウントを削除すると、トレーニング記録も削除されます。
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

export default AboutAccount;
