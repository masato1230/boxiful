import { Fragment } from 'react';
import overallDescriptionThumbnail from '../images/overallDescriptionThumbnail.svg';

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
      </p>
    </Fragment>
  ),
};

export const getStartedPageModels = [aboutThisSite];
