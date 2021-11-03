import { FaFire } from 'react-icons/fa';
import { RiTimerFill } from 'react-icons/ri';
import { useActions } from '../../hooks/useActions';
import Menu from '../../state/menu';
import { createInstructionsFromMenu } from '../../state';
import { useHistory } from 'react-router';

interface MenuCardProps {
  menuThumbnail: string;
  menu: Menu;
}

const MenuCard: React.FC<MenuCardProps> = ({ menuThumbnail, menu }) => {
  // redux
  const { setMenu, setInstructions, resetScores } = useActions();

  const history = useHistory(); 

  const onMenuClick = () => {
    // set menu
    setMenu(menu);
    // set instructions
    setInstructions(createInstructionsFromMenu(menu));
    // reset scores
    resetScores();
    // redirect to training
    history.push('/training');
  };

  return (
    <button onClick={onMenuClick} className="rounded overflow-hidden shadow-lg hover:bg-gray-200 hover:shadow-xl-5 focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:ring-opacity-50">
      <img className="h-48 md:h-auto lg:h-auto xl:h-auto 2xl:h-auto xl w-full object-contain" src={menuThumbnail} alt="Mountain" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{menu.title}</div>
        <p className="text-gray-700 text-base">{menu.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="w-full inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          <FaFire className="text-red-500 inline-block h-6 mr-2 ml-1" />
          消費カロリー目安 {menu.approximateCalorieConsumption}kcal
        </span>
        <span className="w-full inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          <RiTimerFill className="text-blue-500 inline-block text-xl mr-2" />
          所要時間 約{menu.durationInMinutes}分
        </span>
      </div>
    </button>
  );
};

export default MenuCard;
