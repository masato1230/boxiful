import React, { useState } from 'react';
import { GiBoxingGlove } from 'react-icons/gi';
import hardMenuIcon from '../images/hardMenuIcon.svg';
import API from '../api';
import { useHistory } from 'react-router';
import { useIsLoggedIn } from '../hooks/useIsLoggedIn';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN } from '../constants/cookieKeys';

const DeleteAccount = () => {
  const { logout } = useIsLoggedIn();
  const cookies = useCookies()[0];
  const [errorMessage, setErrorMessage] = useState<String | null>(null);
  const history = useHistory();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    API.delete('users/delete/', {
      headers: {
        Authorization: `JWT ${cookies[ACCESS_TOKEN]}`,
      },
    })
      .then(() => {
        logout();
        history.push('/');
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setErrorMessage('アカウントを削除するには、ログインが必要です。');
        } else {
          setErrorMessage(error.response.data);
        }
      });
  };

  return (
    <div className="flex flex-col items-center flex-1 px-4 sm:px-0 bg-yellow-500 h-screen pt-36">
      <div
        className="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2 bg-white sm:mx-0"
        style={{ height: 500 }}
      >
        <div className="flex flex-col w-full md:w-1/2 p-4">
          <div className="flex flex-col flex-1 justify-center mb-8">
            <h1 className="text-center flex justify-center items-center text-4xl">
              <div className="text-yellow-500 pr-2">
                <GiBoxingGlove />
              </div>
              <span className="font-semibold text-gray-500">
                Boxi<span className="text-yellow-500">ful</span>
              </span>
            </h1>
            <div className="w-full mt-4">
              <h2 className="text-center font-bold text-xl mb-5">
                アカウントの削除
              </h2>
              <form
                className="form-horizontal w-3/4 mx-auto"
                onSubmit={handleSubmit}
              >
                <p className="text-red-400">
                  アカウントを削除すると、今までのトレーニング記録も削除されます
                </p>
                <div className="flex flex-col mt-8">
                  <button className="bg-red-500 hover:bg-red-700 text-white text-sm font-semibold py-2 px-4 rounded mb-3">
                    アカウントを削除
                  </button>
                  {errorMessage && (
                    <p className="text-red-500">{errorMessage}</p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        <img
          className="hidden md:block md:w-1/2 rounded-r-lg object-contain"
          src={hardMenuIcon}
          alt="hard menu"
        />
      </div>
    </div>
  );
};

export default DeleteAccount;
