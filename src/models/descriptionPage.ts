import overallDescriptionThumbnail from '../images/overallDescriptionThumbnail.svg';

export default interface descriptionPage {
  tabTitle: string;
  imageSrc: string;
  description: string;
}

export const overallDescriptionPage: descriptionPage = {
  tabTitle: 'このサイトについて',
  imageSrc: overallDescriptionThumbnail,
  description: 'Boxful(ボクシフル)はPCのインカメラを利用した、実際に体を動かすキックボクシングゲームです。',
};

export const descriptionPages = [
  overallDescriptionPage,
]