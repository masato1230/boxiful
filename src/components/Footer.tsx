import { AiFillTwitterCircle } from 'react-icons/ai';
import { BiNote } from 'react-icons/bi';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useIsLoggedIn } from '../hooks/useIsLoggedIn';

const Footer = () => {
  const history = useHistory();
  const { isLoggedIn } = useIsLoggedIn();

  const onDeleteAccountClick = () => {
    history.push('/delete_account');
  };

  return (
    <footer className="footer bg-white">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-1 border-t-2 border-gray-300 py-6">
        {/* Site name anc copyright */}
        <div className="text-center col-span-2 md:col-span-1">
          <Link to="/">
            <h4 className="text-center flex justify-center items-center text-4xl font-semibold text-gray-500 md:mb-10">
              Boxi<span className="text-yellow-500">ful</span>
            </h4>
            <p className="text-sm text-gray-500 font-bold mb-2">
              © 2021 by Makkori
            </p>
          </Link>
        </div>
        {/* Guide & Help */}
        <div className="text-center">
          <h6 className="font-bold mb-4">Guide & Help</h6>
          {isLoggedIn && (
            <Link
              className="block text-xs md:text-base text-gray-500 hover:text-black duration-300 font-medium mb-2"
              to="/delete_account"
            >
              アカウント削除
            </Link>
          )}
          <Link
            className="block text-xs md:text-base text-gray-500 hover:text-black duration-300 font-medium mb-2"
            to="/privacy"
          >
            プライバシー
          </Link>
          <Link
            className="block text-xs md:text-base text-gray-500 hover:text-black duration-300 font-medium mb-2"
            to="/contact_form"
          >
            お問合わせ
          </Link>
        </div>
        {/* Contents */}
        <div className="text-center">
          <h6 className="font-bold mb-4">Contents</h6>
          <Link
            className="block text-xs md:text-base text-gray-500 hover:text-black duration-300 font-medium mb-2"
            to="/"
          >
            ホーム/ダッシュボード
          </Link>
          <Link
            className="block text-xs md:text-base text-gray-500 hover:text-black duration-300 font-medium mb-2"
            to="/about"
          >
            サイト・管理者について
          </Link>
          <Link
            className="block text-xs md:text-base text-gray-500 hover:text-black duration-300 font-medium mb-2"
            to="/about_judge"
          >
            パンチ/キックの判定
          </Link>
          <Link
            className="block text-xs md:text-base text-gray-500 hover:text-black duration-300 font-medium mb-2"
            to="/about_account"
          >
            アカウントについて
          </Link>
        </div>
        <div className="text-center">
          <h6 className="font-bold mb-4">SNS</h6>
          <a
            href="https://twitter.com/xFzdiHLW63ogLYr"
            target="_blank"
            rel="noreferrer"
            className="block"
          >
            <AiFillTwitterCircle
              className="inline-block text-blue-400"
              size={20}
            />
            <span className="ml-1 text-gray-500 hover:text-black duration-300 font-medium mb-2">
              製作者twitter
            </span>
          </a>
          <a
            href="https://note.com/masato1230"
            target="_blank"
            rel="noreferrer"
            className="block"
          >
            <BiNote className="ml-3 inline-block text-green-400" size={20} />
            <span className="ml-1 text-gray-500 hover:text-black duration-300 font-medium">
              note
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
