import { Fragment, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router';
import { GiBoxingGlove } from 'react-icons/gi';
import CustomHead from './CustomHead';
import hardMenuIcon from '../images/hardMenuIcon.svg';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/cookieKeys';
import API from '../api';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const setCookie = useCookies()[1];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getJwt();
  };

  const getJwt = async () => {
    await API.post('users/token/', {
      email,
      password,
    })
      .then((response) => {
        setCookie(ACCESS_TOKEN, response.data.access);
        setCookie(REFRESH_TOKEN, response.data.refresh);
        setIsLoggedIn(true);
      })
      .catch((err: any) => {
        alert('メールアドレスかパスワードが違います。');
      });
  };

  // Redirect to Status after logged in
  useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    }
  }, [isLoggedIn, history]);

  return (
    <Fragment>
      <CustomHead title="ログイン - Boxiful" />
      <div className="flex flex-col items-center flex-1 px-4 sm:px-0 bg-yellow-500 h-screen pt-36">
        <h1 className="mt-5 mb-2 ml-5 text-3xl font-bold text-yellow-300 text-right">
          Login
        </h1>
        <div
          className="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2 bg-white sm:mx-0"
          style={{ height: 500 }}
        >
          <div className="flex flex-col w-full md:w-1/2 p-4">
            <div className="flex flex-col flex-1 justify-center mb-8">
              <h2 className="text-center flex justify-center items-center text-4xl">
                <div className="text-yellow-500 pr-2">
                  <GiBoxingGlove />
                </div>
                <span className="font-semibold text-gray-500">
                  Boxi<span className="text-yellow-500">ful</span>
                </span>
              </h2>
              <div className="w-full mt-4">
                <form
                  className="form-horizontal w-3/4 mx-auto"
                  onSubmit={handleSubmit}
                >
                  <div className="flex flex-col mt-4">
                    <input
                      id="email"
                      type="email"
                      className="flex-grow h-8 px-2 border rounded border-grey-400"
                      name="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="メールアドレス"
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <input
                      id="password"
                      type="password"
                      className="flex-grow h-8 px-2 rounded border border-grey-400"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="パスワード"
                    />
                  </div>
                  <div className="flex flex-col mt-8">
                    <button className="bg-green-500 hover:bg-green-700 text-white text-sm font-semibold py-2 px-4 rounded">
                      ログイン
                    </button>
                  </div>
                </form>
                <div className="text-center mt-4">
                  <p className="block mt-3 text-center text-xs">
                    パスワードを忘れた場合は
                    <a
                      target="_blank"
                      href="https://masato.pythonanywhere.com/users/password_reset"
                      className="rounded text-blue-500 hover:text-white hover:bg-blue-500 duration-300 cursor-pointer"
                    >
                      こちら
                    </a>
                  </p>
                </div>
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
    </Fragment>
  );
};

export default Login;
