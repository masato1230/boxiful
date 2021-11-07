import { Link } from 'react-router-dom';
import { GiBoxingGlove } from 'react-icons/gi';
import { BsFillPeopleFill } from 'react-icons/bs';
import { useIsLoggedIn } from '../hooks/useIsLoggedIn';

const Header = () => {
  // hooks
  const [isLoggedIn, logout] = useIsLoggedIn();

  const onLogoutClick = () => {
    logout();
  };

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
          {isLoggedIn ? (
            <div className="flex items-center space-x-3">
              <Link to="/">
                <div className="rounded text-gray-500 text-2xl mr-4">
                  <BsFillPeopleFill />
                </div>
              </Link>
              <Link to="/">
                <div
                  className="py-2 px-2 font-medium text-white bg-yellow-500 rounded hover:bg-yellow-300 transition duration-300"
                  onClick={onLogoutClick}
                >
                  ログアウト
                </div>
              </Link>
            </div>
          ) : (
            <div className="flex items-center content-center space-x-3 ">
              <Link
                to="/login"
                className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-yellow-500 hover:text-white transition duration-300"
              >
                ログイン
              </Link>
              <Link
                to="/register"
                className="py-2 px-2 font-medium text-white bg-yellow-500 rounded hover:bg-yellow-400 transition duration-300"
              >
                アカウント作成
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
