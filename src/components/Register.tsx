import { useEffect, useState, Fragment } from 'react';
import { useCookies } from 'react-cookie';
import { GiBoxingGlove } from 'react-icons/gi';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import CustomHead from './CustomHead';
import API from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/cookieKeys';
import { useIsLoggedIn } from '../hooks/useIsLoggedIn';
import hardMenuIcon from '../images/hardMenuIcon.svg';

const Register = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const setCookie = useCookies()[1];
  const history = useHistory();
  const { isLoggedIn } = useIsLoggedIn();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // form check
    if (email === '') {
      setEmailError('メールアドレスを入力してください。');
      return;
    }
    if (password === '') {
      setPasswordError('パスワードを入力してください。');
      return;
    }
    createRequest();
  };

  const createRequest = async () => {
    await API.post('users/register/', {
      email,
      password,
    })
      .then((response) => {
        // login user and redirect to status
        getJwt();
        history.replace('/');
      })
      .catch((error) => {
        console.error(error.response.data);
        if (error.response.data.email) {
          setEmailError(
            'このメールアドレスは既に登録されています。ログインし直してください。'
          );
        }
      });
  };

  const getJwt = async () => {
    await API.post('users/token/', {
      email,
      password,
    }).then((response) => {
      setCookie(ACCESS_TOKEN, response.data.access);
      setCookie(REFRESH_TOKEN, response.data.refresh);
    });
  };

  // check user is logged in and if logged in redirect to '/'
  useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    }
  }, [history, isLoggedIn]);

  return (
    <Fragment>
      <CustomHead title="アカウント作成 - Boxiful" />
      <div className="flex flex-col items-center flex-1 px-4 sm:px-0 bg-yellow-500 h-screen pt-36">
        <h1 className="mt-5 mb-2 ml-5 text-3xl font-bold text-yellow-300 text-right">
          Register
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
                    <label htmlFor="email" className="py-1">
                      メールアドレス
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="flex-grow h-8 px-2 border rounded border-grey-400"
                      name="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="boxful@example.com"
                    />
                    <p className="text-red-500">{emailError}</p>
                  </div>
                  <div className="flex flex-col mt-4">
                    <label htmlFor="password" className="py-1">
                      パスワード
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="flex-grow h-8 px-2 rounded border border-grey-400"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder=""
                    />
                  </div>
                  <p className="text-red-500">{passwordError}</p>
                  <div className="flex flex-col mt-8">
                    <button className="bg-green-500 hover:bg-green-700 text-white text-sm font-semibold py-2 px-4 rounded">
                      アカウント作成
                    </button>
                  </div>
                  <p className="block mt-3 text-center text-xs">
                    プライバシーポリシーは
                    <Link
                      target="_blank"
                      to="/privacy"
                      className="rounded text-blue-500 hover:text-white hover:bg-blue-500 duration-300 cursor-pointer"
                    >
                      こちら
                    </Link>
                  </p>
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
    </Fragment>
  );
};

export default Register;
