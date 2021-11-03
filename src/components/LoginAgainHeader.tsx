import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useHistory } from 'react-router';
import { useIsLoggedIn } from '../hooks/useIsLoggedIn';

const LoginAgainHeader = () => {
  const [isShow, setIsShow] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useIsLoggedIn();

  // If user already logged in, dismiss this header
  useEffect(() => {
    if (isLoggedIn) {
      setIsShow(false);
    }
  }, [isLoggedIn]);

  const history = useHistory();

  const onCloseClick = () => {
    setIsShow(false);
  }

  const onLoginClick = () => {
    setIsShow(false);
    history.push('/login');
  }

  return (
    <div
      className={`bg-yellow-500 shadow-lg text-center py-3 px-5 ${
        !isShow && 'hidden'
      }`}
    >
      <div className="container mx-auto text-white">
        <IoClose className="inline-block float-left hover:bg-yellow-300" size={25} onClick={onCloseClick} />
        トレーニング記録を閲覧するには、再度ログインが必要です。
        <button className="px-2 font-medium text-white rounded hover:bg-white hover:text-gray-700 transition duration-300 float-right" onClick={onLoginClick} >ログイン</button>
      </div>
    </div>
  );
};

export default LoginAgainHeader;
