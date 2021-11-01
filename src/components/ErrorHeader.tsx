import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';

interface ErrorHeaderProps {
  errorMessage: string;
}

const ErrorHeader: React.FC<ErrorHeaderProps> = ({ errorMessage }) => {
  const [isShow, setIsShow] = useState(true);

  const onCloseClick = () => {
    setIsShow(false);
  }

  return (
    <div
      className={`bg-yellow-500 shadow-lg text-center py-3 px-5 ${
        !isShow && 'hidden'
      }`}
    >
      <div className="container mx-auto text-white">
        <IoClose className="inline-block float-left hover:bg-yellow-300" size={25} onClick={onCloseClick} />
        {errorMessage}
      </div>
    </div>
  );
};

export default ErrorHeader;
