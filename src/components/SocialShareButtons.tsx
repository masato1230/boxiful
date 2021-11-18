import React from 'react';
import {
  TwitterShareButton,
  TwitterIcon,
  LineShareButton,
  LineIcon,
} from 'react-share';

interface SocialShareButtonsProps {
  shareTitle: string;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({
  shareTitle,
}) => {
  return (
    <React.Fragment>
      <div className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm my-3 mx-1">
        <TwitterShareButton
          url={'https://boxiful.jp'}
          title={shareTitle}
          hashtags={['boxiful']}
          className="text-white w-full h-full"
        >
          <TwitterIcon className="inline-block mr-3" size={24} round />
          Twitterで結果をシェア
        </TwitterShareButton>
      </div>
      <div className="bg-green-600 hover:bg-green-800 text-white text-center py-1 px-3 rounded text-sm my-3 mx-1">
        <LineShareButton
          url={'https://boxiful.jp'}
          title={shareTitle}
          className="text-white w-full h-full"
        >
          <LineIcon className="inline-block mr-3" size={24} round />
          Lineで結果をシェア
        </LineShareButton>
      </div>
    </React.Fragment>
  );
};

export default SocialShareButtons;
