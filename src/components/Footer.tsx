import { AiFillTwitterCircle } from 'react-icons/ai';
import { BiNote } from 'react-icons/bi';
import { useHistory } from 'react-router';
import { useIsLoggedIn } from '../hooks/useIsLoggedIn';

const Footer = () => {
  const history = useHistory();
  const { isLoggedIn } = useIsLoggedIn();

  const onDeleteAccountClick = () => {
    history.push('/delete_account');
  };

  return (
    <footer className="footer">
      <div className="container mx-auto px-6">
        <div className="mt-1 border-t-2 border-gray-300 flex">
          <div className="w-1/3 text-center py-6">
            {isLoggedIn && (
              <button
                className="text-xs md:text-base text-gray-500 hover:text-black duration-300 font-medium mb-2"
                onClick={onDeleteAccountClick}
              >
                アカウント削除
              </button>
            )}
          </div>
          <div className="w-1/3 text-center py-6">
            <p className="text-sm text-gray-500 font-bold mb-2">
              © 2021 by Masato
            </p>
          </div>
          <div className="w-1/3 py-6">
            <a
              href="https://twitter.com/xFzdiHLW63ogLYr"
              target="_blank"
              rel="noreferrer"
            >
              <AiFillTwitterCircle
                className="inline-block text-blue-400"
                size={20}
              />
              <span className="hidden md:inline-block ml-1 align-middle">
                製作者twitter
              </span>
            </a>
            <a
              href="https://note.com/masato1230"
              target="_blank"
              rel="noreferrer"
            >
              <BiNote className="ml-3 inline-block text-green-400" size={20} />
              <span className="ml-1 hidden md:inline-block align-middle">
                note
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
