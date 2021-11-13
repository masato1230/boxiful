import React, { Dispatch, SetStateAction } from 'react';
import { IoClose } from 'react-icons/io5';
import DescriptionTabs from './DescriptionTabs';

interface DescriptionsProps {
  setIsShowDescriptions: Dispatch<SetStateAction<boolean>>;
}

const Descriptions: React.FC<DescriptionsProps> = ({ setIsShowDescriptions }) => {
  return (
    <div
      className="fixed z-50 top-0 w-screen h-screen bg-black bg-opacity-40 text-white"
    >
      <div
        className="bg-black w-1/2 rounded-xl pt-10 pl-10 pr-10 pb-5 m-auto relative bg-opacity-90"
        style={{ marginTop: '10%' }}
      >
        <IoClose
          className="absolute top-5 left-5 hover:bg-gray-300 rounded-full"
          size="30"
          onClick={() => setIsShowDescriptions(false)}
        />
        <DescriptionTabs />
        <div className="flex flex-row-reverse">
          <button className="font-bold text-sm text-center mt-5 px-2 py-1 rounded-xl hover:bg-gray-400">
            次へ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Descriptions;
