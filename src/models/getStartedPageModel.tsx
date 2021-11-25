import { Fragment } from 'react';
import overallDescriptionThumbnail from '../images/overallDescriptionThumbnail.svg';
import selectTrainingThumbnail from '../images/selectTrainingDescriptionThumbnail.png';
import askCameraAccessImage from '../images/askCameraAccess.png';
import trainingScreenThumbnail from '../images/TrainingScreenDescriptionThumbnail.png';

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
          className="mx-auto h-56 object-contain"
          src={overallDescriptionThumbnail}
          alt="PCと女性"
        />
      </div>
      <p>
        Boxiful(ボクシフル)はPCのインカメラとAIを利用した、実際に体を動かすキックボクシングゲームです。
        メニューを選択してトレーニングをスタートしましょう!
      </p>
    </Fragment>
  ),
};

const firstSelectMenu: getStartedPageModel = {
  tabTitle: '1. メニューを選択',
  content: (
    <Fragment>
      <div className="rounded-xl bg-yellow-500 p-3 mb-3">
        <img
          className="mx-auto h-56 object-contain"
          src={selectTrainingThumbnail}
          alt="メニュー一覧"
        />
      </div>
      <p className="mb-5">
        このページの下の方にある、メニュー一覧よりやってみたいメニューを選択しましょう。メニューを選択するとトレーニング画面に移ります。
      </p>
      <p className="text-xs">
        注意 トレーニング画面に移動すると、BGM音楽が再生されます。
      </p>
    </Fragment>
  ),
};

const secondAllowCameraAccess: getStartedPageModel = {
  tabTitle: '2. カメラの使用を許可',
  content: (
    <Fragment>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <img
          className="mx-auto"
          src={askCameraAccessImage}
          alt="カメラの使用を許可"
        />
        <p>
          トレーニング中はPCのカメラを利用して体の動きを判定します。カメラの利用を許可するか拒否するかのダイアログが表示されるので、カメラの利用を許可してください。
        </p>
      </div>
      <p className="text-xs">
        *カメラの映像はあなたのデバイス上で処理されるので、映像がデバイス外部に出ることは一切ありません。
      </p>
    </Fragment>
  ),
};

const thirdStartTraining: getStartedPageModel = {
  tabTitle: '3. トレーニング開始',
  content: (
    <Fragment>
      <p>カメラの使用を許可したら、いよいよトレーニング開始です。画面から2mくらい離れて、体の膝から上がカメラに映るようにしましょう。</p>
      <img className="h-56 mx-auto" src={trainingScreenThumbnail} alt="トレーニング画面" />
      <p className="mb-5">画面の左側にキックやパンチの指示が表示され、右側にはカメラの映像が表示されます。</p>
      <p className="text-xs">* 画面の読み込みには通常5秒ほどかかります。</p>
    </Fragment>
  ),
};

export const getStartedPageModels = [
  aboutThisSite,
  firstSelectMenu,
  secondAllowCameraAccess,
  thirdStartTraining,
];
