import overallDescriptionThumbnail from '../images/overallDescriptionThumbnail.svg';
import selectTrainingThumbnail from '../images/selectTrainingDescriptionThumbnail.png';
import trainingScreenThumbnail from '../images/TrainingScreenDescriptionThumbnail.png';
import resultThumbnail from '../images/resultDescriptionThumbnail.png';
import waringThumbnail from '../images/warningDescriptionThumbnail.svg';
import cameraThumbnail from '../images/cameraDescriptionThumbnail.svg';

export default interface descriptionPage {
  tabTitle: string;
  imageSrc: string;
  description: string;
}

export const overallDescriptionPage: descriptionPage = {
  tabTitle: 'このサイトについて',
  imageSrc: overallDescriptionThumbnail,
  description:
    'Boxful(ボクシフル)はPCのインカメラとAIを利用した、実際に体を動かすキックボクシングゲームです。',
};

export const usageOneSelectMenuPage: descriptionPage = {
  tabTitle: '手順１ - メニューを選択',
  imageSrc: selectTrainingThumbnail,
  description:
    '　まずは、トレーニングメニューを選択。イージーメニュー、ノーマルメニュー、ハードメニューの中からやってみたいメニューを選択してくださ。メニューを選択するとトレーニングが始まります!',
};

export const usageTwoTrainingPage: descriptionPage = {
  tabTitle: '手順２ - トレーニング',
  imageSrc: trainingScreenThumbnail,
  description:
    '　トレーニングメニューを選択すると、画面が切り替わりカメラが起動します。カメラに全身が映るように、２メートルくらい画面から下がり、画面左側に表示されるキック・パンチをしてください。',
};

export const usageThreeResultPage: descriptionPage = {
  tabTitle: '手順３ - 結果を確認',
  imageSrc: resultThumbnail,
  description:
    '　トレーニングが終わると、結果が表示されます。消費カロリーやボクシフル年齢を確認しましょう。結果はTwitterやLineで共有もできます。',
};

export const warningPage: descriptionPage = {
  tabTitle: '注意点',
  imageSrc: waringThumbnail,
  description:
    'AIを使用する関係で、iPhoneやiPadなどのiOS端末ではサイトがうまく動作しない場合がございます。',
};

export const cameraPage: descriptionPage = {
  tabTitle: 'カメラと画像処理について',
  imageSrc: cameraThumbnail,
  description:
    'カメラより取得している動画はあなたのデバイスの外部に出ることは一切ございません。トレーニング中の姿勢認識速度が遅いと感じた時は、できるだけ体以外のモノがカメラに映らないようにしてください。',
};

export const descriptionPages = [
  overallDescriptionPage,
  usageOneSelectMenuPage,
  usageTwoTrainingPage,
  usageThreeResultPage,
  warningPage,
  cameraPage,
];
