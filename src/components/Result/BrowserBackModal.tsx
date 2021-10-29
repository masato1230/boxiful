import { Dispatch, SetStateAction } from 'react';
import { IoMdWarning } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import PageTransitionButtons from './PageTransitionButtons';

interface BrowserBackModalProps {
  setIsBrowserBackModalShow: Dispatch<SetStateAction<boolean>>;
}

const BrowserBackModal: React.FC<BrowserBackModalProps> = ({
  setIsBrowserBackModalShow,
}) => {
  const onCloseClick = () => {
    setIsBrowserBackModalShow(false);
  };

  return (
    <div
      className="fixed z-50 top-0 w-screen h-screen bg-black bg-opacity-20"
      onClick={onCloseClick}
    >
      <div
        className="bg-white w-1/2 rounded-xl p-10 m-auto relative"
        style={{ marginTop: '10%' }}
      >
        <IoClose
          className="absolute top-5 left-5 hover:bg-gray-300 rounded-full"
          size="30"
          onClick={onCloseClick}
        />
        <IoMdWarning
          className="mx-auto text-green-500"
          spacing={100}
          size="50%"
        />
        <h2 className="text-3xl font-bold text-center my-5">
          トレーニング画面には戻れません。
        </h2>
        <p>
          ダッシュボードに戻るか、もう一度同じメニューをするか選択してください。
        </p>
        <PageTransitionButtons />
      </div>
    </div>
  );
};

export default BrowserBackModal;
