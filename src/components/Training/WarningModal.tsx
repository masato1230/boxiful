import React from 'react';
import { IoClose } from 'react-icons/io5';
import { IoMdWarning } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useReload } from '../../hooks/useReload';

interface WarningModalProps {
  setIsShowWarningModal: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  colorClass: 'red-500' | 'yellow-500';
}

const WarningModal: React.FC<WarningModalProps> = ({
  setIsShowWarningModal,
  message,
  colorClass,
}) => {
  const backToDashBoard = useReload();
  const onCloseClick = () => {
    setIsShowWarningModal(false);
  };

  return (
    <div
      className="fixed z-50 top-0 w-screen h-screen bg-black bg-opacity-20"
      onClick={onCloseClick}
    >
      <div
        className="bg-white w-5/6 md:w-1/2 rounded-xl p-10 m-auto relative"
        style={{ marginTop: '10%' }}
      >
        <IoClose
          className="absolute top-5 left-5 hover:bg-gray-300 rounded-full"
          size="30"
          onClick={onCloseClick}
        />
        <IoMdWarning
          className={`mx-auto text-${colorClass}`}
          spacing={100}
          size="50%"
        />
        <h2 className="text-base md:text-xl font-bold text-center my-5">
          {message}
        </h2>
        <button
          className="block bg-yellow-500 hover:bg-yellow-700 text-white text-center py-2 px-3 rounded text-sm mt-5 mx-auto"
          onClick={backToDashBoard}
        >
          ダッシュボードに戻る
        </button>
      </div>
    </div>
  );
};

export default WarningModal;
