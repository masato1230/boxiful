import { Link } from 'react-router-dom';
import { GiBoxingGlove } from 'react-icons/gi';
import { BsFillPeopleFill } from 'react-icons/bs';
import { useState } from 'react';

const Header = () => {
  // TODO: 下のログイン時にisAuthの値をちゃんと更新するようにする
  const [isAuth, setIsAuth] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              {/* <!-- Website Logo --> */}
              <Link to="/" className="flex items-center py-4 px-2">
                {/* <img src="logo.png" alt="Logo" className="h-8 w-8 mr-2" /> */}
                <div className="text-yellow-500 pr-2">
                  <GiBoxingGlove />
                </div>
                <span className="font-semibold text-gray-500 text-lg">
                  Boxi<span className="text-yellow-500">ful</span>
                </span>
              </Link>
            </div>
          </div>
          {/* <!-- Secondary Navbar items --> */}
          {isAuth ? (
            <div className="hidden md:flex items-center space-x-3">
              <Link to="/">
                <div className="rounded text-gray-500 text-2xl mr-4">
                  <BsFillPeopleFill />
                </div>
              </Link>
              <Link to="/logout">
                <div className="py-2 px-2 font-medium text-white bg-yellow-500 rounded hover:bg-yellow-300 transition duration-300">
                  ログアウト
                </div>
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-3 ">
              <Link to="/login"
                className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-yellow-500 hover:text-white transition duration-300"
              >
                ログイン
              </Link>
              <a
                href=""
                className="py-2 px-2 font-medium text-white bg-yellow-500 rounded hover:bg-yellow-400 transition duration-300"
              >
                アカウント作成
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
