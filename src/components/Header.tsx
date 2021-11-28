import { Link, useHistory } from 'react-router-dom';
import { GiBoxingGlove } from 'react-icons/gi';
import { BsGrid1X2Fill } from 'react-icons/bs';
import { useIsLoggedIn } from '../hooks/useIsLoggedIn';
import ReactTooltip from 'react-tooltip';
import React, { useEffect, useState } from 'react';
import Descriptions from './Descriptions/Descriptions';
import {
  aboutDescriptionPages,
  judgeDescriptionPages,
  accountManagementDescriptionPages,
} from '../models/descriptionPage';
import { useCameraResetReload } from '../hooks/useCameraResetReload';

const Header = () => {
  // hooks
  const { isLoggedIn, logout } = useIsLoggedIn();
  const backToDashboard = useCameraResetReload();

  // States
  const [isShowJudgeDesc, setIsShowJudgeDesc] = useState(false);
  const [isShowAccountManageDesc, setIsShowAccountManageDesc] = useState(false);

  // Click listeners
  const onLogoutClick = () => {
    logout();
  };

  return (
    <React.Fragment>
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              <div>
                {/* <!-- Website Logo --> */}
                <button
                  className="flex block items-center py-4 px-2"
                  onClick={backToDashboard}
                >
                  {/* <img src="logo.png" alt="Logo" className="h-8 w-8 mr-2" /> */}
                  <div className="text-yellow-500 pr-2">
                    <GiBoxingGlove />
                  </div>
                  <span className="font-semibold text-gray-500 text-lg">
                    Boxi<span className="text-yellow-500">ful</span>
                  </span>
                </button>
              </div>
            </div>
            {/* <!-- Secondary Navbar items --> */}
            <div className="flex items-center space-x-3">
              <Link
                className="text-xs md:text-base text-gray-500 hover:text-black duration-300 px-2 py-2 font-medium"
                to="/about"
              >
                About
              </Link>
              <Link
                className="md:text-sm text-gray-500 hidden md:inline-block hover:text-black duration-300 px-2 py-2 font-semibold"
                to="/about_judge"
              >
                パンチ/キックの判定
              </Link>
              <Link
                className="md:text-sm text-gray-500 hidden md:inline-block hover:text-black duration-300 px-2 py-2 font-semibold"
                to="/about_account"
              >
                アカウントについて
              </Link>
              {isLoggedIn ? (
                <React.Fragment>
                  <button onClick={backToDashboard} className="px-2 py-2">
                    <div className="flex rounded text-gray-500 text-2xl mr-4">
                      <BsGrid1X2Fill
                        color="rgb(245, 158, 11)"
                        data-tip={'ダッシュボードを表示'}
                      />
                      <ReactTooltip />
                    </div>
                  </button>
                  <button>
                    <div
                      className="text-xs md:text-base py-2 px-2 font-medium text-white bg-yellow-500 rounded hover:bg-yellow-300 transition duration-300"
                      onClick={onLogoutClick}
                    >
                      ログアウト
                    </div>
                  </button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Link
                    to="/login"
                    className="text-xs md:text-base py-2 px-2 font-medium text-gray-500 rounded hover:bg-yellow-500 hover:text-white transition duration-300"
                  >
                    ログイン
                  </Link>
                  <Link
                    to="/register"
                    className="text-xs md:text-base py-2 px-2 font-medium text-white bg-yellow-500 rounded hover:bg-yellow-400 transition duration-300"
                  >
                    アカウント作成
                  </Link>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </nav>
      {isShowJudgeDesc && (
        <Descriptions
          descriptionPages={judgeDescriptionPages}
          setIsShowDescriptions={setIsShowJudgeDesc}
        />
      )}
      {isShowAccountManageDesc && (
        <Descriptions
          descriptionPages={accountManagementDescriptionPages}
          setIsShowDescriptions={setIsShowAccountManageDesc}
        />
      )}
    </React.Fragment>
  );
};

export default Header;
