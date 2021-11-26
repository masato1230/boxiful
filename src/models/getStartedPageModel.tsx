import { Fragment } from 'react';
import overallDescriptionThumbnail from '../images/overallDescriptionThumbnail.svg';
import selectTrainingThumbnail from '../images/selectTrainingDescriptionThumbnail.png';
import askCameraAccessImage from '../images/askCameraAccess.png';
import trainingScreenThumbnail from '../images/TrainingScreenDescriptionThumbnail.png';
import resultThumbnail from '../images/resultDescriptionThumbnail.png';
import trainingRecordsImage from '../images/trainingRecords.png';

export default interface getStartedPageModel {
  tabTitle: string;
  content: JSX.Element;
}

const aboutThisSite: getStartedPageModel = {
  tabTitle: 'このサイトについて',
  content: (
    <Fragment>
      <div className="rounded-xl bg-yellow-500 p-3 mb-3">
        <img
          className="mx-auto max-h-48 object-contain"
          src={overallDescriptionThumbnail}
          alt="PCと女性"
        />
      </div>
      <p className="text-sm md:text-base">
        　Boxiful(ボクシフル)はPCのインカメラとAIを利用した、実際に体を動かすキックボクシングゲームです。
        メニューを選択してトレーニングをスタートしましょう!
      </p>
    </Fragment>
  ),
};

const firstSelectMenu: getStartedPageModel = {
  tabTitle: '1. メニューを選択',
  content: (
    <div className="text-sm md:text-base">
      <div className="rounded-xl bg-yellow-500 p-3 mb-3">
        <img
          className="mx-auto max-h-48 object-contain"
          src={selectTrainingThumbnail}
          alt="メニュー一覧"
        />
      </div>
      <p className="mb-5">
        このページの下の方にある、メニュー一覧よりやってみたいメニューを選択しましょう。メニューを選択するとトレーニング画面に移ります。
      </p>
      <p className="text-xs text-gray-500">
        注意 トレーニング画面に移動すると、BGM音楽が再生されます。
      </p>
    </div>
  ),
};

const secondAllowCameraAccess: getStartedPageModel = {
  tabTitle: '2. カメラの使用を許可',
  content: (
    <Fragment>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <img
          className="mx-auto object-contain md:mt-2"
          src={askCameraAccessImage}
          alt="カメラの使用を許可"
        />
        <p className="text-sm md:text-base">
          トレーニング中はPCのカメラを利用して体の動きを判定します。トレーニング画面に移動すると、カメラの利用を許可するか拒否するかのダイアログが表示されるので、カメラの利用を許可してください。
        </p>
      </div>
      <p className="text-xs text-gray-500">
        *カメラの映像はあなたのデバイス上で処理されるので、映像がデバイス外部に出ることは一切ありません。
      </p>
    </Fragment>
  ),
};

const thirdStartTraining: getStartedPageModel = {
  tabTitle: '3. トレーニング開始',
  content: (
    <Fragment>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <img
          className="max-h-48 mx-auto object-contain"
          src={trainingScreenThumbnail}
          alt="トレーニング画面"
        />
        <div className="text-sm md:text-base">
          <p className="mb-5">
            　カメラの使用を許可したら、いよいよトレーニング開始です。画面から2mくらい離れて、体の膝から上がカメラに映るようにしましょう
          </p>
          <p>
            　画面の左側にキックやパンチの指示が表示され、右側にはカメラの映像が表示されます。
          </p>
        </div>
      </div>
      <p className="text-xs text-gray">* 画面の読み込みには通常5秒ほどかかります。</p>
    </Fragment>
  ),
};

const forthCheckResult: getStartedPageModel = {
  tabTitle: '4. 結果の確認',
  content: (
    <div className="text-sm md:text-base grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
      <img
        className="max-h-48 mx-auto mb-3 object-contain"
        src={resultThumbnail}
        alt="トレーニング画面"
      />
      <div>
        <p className="mb-3">
          　トレーニングを最後まで実施すると、結果が表示されます。
        </p>
        <p>
          　消費カロリーやボクシフル年齢を確認しましょう。また、結果はTwitterやLineで共有することができます。
        </p>
      </div>
    </div>
  ),
};

const recordResults: getStartedPageModel = {
  tabTitle: 'トレーニング結果をを記録',
  content: (
    <Fragment>
      <img
        className="max-h-48 mx-auto mb-3 object-contain"
        src={trainingRecordsImage}
        alt="トレーニング記録"
      />
      <div className="text-sm md:text-base">
        <p className="mb-1">
          　アカウントを作成するとトレーニング結果を記録することができます。
        </p>
        <p>
          　消費カロリーやトレーニングの実施状況を振り返ってモチベーションを高めましょう！
        </p>
      </div>
    </Fragment>
  ),
};

export const getStartedPageModels = [
  aboutThisSite,
  firstSelectMenu,
  secondAllowCameraAccess,
  thirdStartTraining,
  forthCheckResult,
  recordResults,
];
