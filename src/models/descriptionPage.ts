import overallDescriptionThumbnail from '../images/overallDescriptionThumbnail.svg';
import selectTrainingThumbnail from '../images/selectTrainingDescriptionThumbnail.png';
import trainingScreenThumbnail from '../images/TrainingScreenDescriptionThumbnail.png';
import resultThumbnail from '../images/resultDescriptionThumbnail.png';
import waringThumbnail from '../images/warningDescriptionThumbnail.svg';
import cameraThumbnail from '../images/cameraDescriptionThumbnail.svg';
import punchThumbnail from '../images/punchDescriptionThumbnail.svg';
import kickThumbnail from '../images/kickDescriptionThumbnail.svg';
import longLoadingThumbnail from '../images/longLoadingDescriptionThumbnail.svg';
import questionThumbnail from '../images/questionThumbnail.svg';

export default interface descriptionPage {
  tabTitle: string;
  imageSrc: string;
  description: string;
}

// for about description pages
const overallDescriptionPage: descriptionPage = {
  tabTitle: 'このサイトについて',
  imageSrc: overallDescriptionThumbnail,
  description:
    'Boxful(ボクシフル)はPCのインカメラとAIを利用した、実際に体を動かすキックボクシングゲームです。',
};

const usageOneSelectMenuPage: descriptionPage = {
  tabTitle: '手順１ - メニューを選択',
  imageSrc: selectTrainingThumbnail,
  description:
    '　まずは、トレーニングメニューを選択。イージーメニュー、ノーマルメニュー、ハードメニューの中からやってみたいメニューを選択してくださ。メニューを選択するとトレーニングが始まります!',
};

const usageTwoTrainingPage: descriptionPage = {
  tabTitle: '手順２ - トレーニング',
  imageSrc: trainingScreenThumbnail,
  description:
    '　トレーニングメニューを選択すると、画面が切り替わりカメラが起動します。カメラに全身が映るように、２メートルくらい画面から下がり、画面左側に表示されるキック・パンチをしてください。',
};

const usageThreeResultPage: descriptionPage = {
  tabTitle: '手順３ - 結果を確認',
  imageSrc: resultThumbnail,
  description:
    '　トレーニングが終わると、結果が表示されます。消費カロリーやボクシフル年齢を確認しましょう。結果はTwitterやLineで共有もできます。',
};

const warningPage: descriptionPage = {
  tabTitle: '注意点',
  imageSrc: waringThumbnail,
  description:
    'AIを使用する関係で、iPhoneやiPadなどのiOS端末ではサイトがうまく動作しない場合がございます。',
};

const cameraPage: descriptionPage = {
  tabTitle: 'カメラと画像処理について',
  imageSrc: cameraThumbnail,
  description:
    'カメラより取得している動画はあなたのデバイスの外部に出ることは一切ございません。トレーニング中の姿勢認識速度が遅いと感じた時は、できるだけ体以外のモノがカメラに映らないようにしてください。',
};

// for judge description pages
const punchJudgePage: descriptionPage = {
  tabTitle: 'パンチの判定について',
  imageSrc: punchThumbnail,
  description:
    'パンチの判定では、パンチを繰り出す前にちゃんと腕を曲げることができているかという点と、パンチをした時に腕が伸びているかという点を判定しています。上手く判定されない時は、これらの点を意識してみてください。',
};

const kickJudgePage: descriptionPage = {
  tabTitle: 'キックの判定について',
  imageSrc: kickThumbnail,
  description:
    'キックの判定では、足を地面に下ろした状態から、足をしっかりと上まで上げてられているかという点をみています。上手く判定されない時は、足をもっと上にあげることを試してみてください。',
};

const longLoadingPage: descriptionPage = {
  tabTitle: 'ローディングが終わらないとき',
  imageSrc: longLoadingThumbnail,
  description:
    'トレーニング画面でローディングがなかなか終わらない場合、このサイトがカメラを利用するのを禁止している可能性と、カメラの前にモノが置いてありカメラに映る映像が真っ暗になっている可能性があります。サイトのカメラ利用を禁止している場合は、もう一度サイトを読み込み直してトレーニング画面にいくと、カメラ利用を許可するかどうか聞かれるので、許可してください。',
};

const stillDoesNotJudgePage: descriptionPage = {
  tabTitle: 'カメラ映像がカクつくとき',
  imageSrc: questionThumbnail,
  description:
    'トレーニング中は画像処理を行うためPCのリソースを大量に利用しています。カメラ映像がカクつく時は、開いている他のサイトやアプリを閉じてみてください。カメラに映るモノを減らすことでもカクつきを軽減できます。',
};

export const aboutDescriptionPages = [
  overallDescriptionPage,
  usageOneSelectMenuPage,
  usageTwoTrainingPage,
  usageThreeResultPage,
  warningPage,
  cameraPage,
];

export const judgeDescriptionPages = [
  punchJudgePage,
  kickJudgePage,
  longLoadingPage,
  stillDoesNotJudgePage,
];
