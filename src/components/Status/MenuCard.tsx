import { FaFire } from 'react-icons/fa';
import { RiTimerFill } from 'react-icons/ri'
import Menu from "../../state/menu";

interface MenuCardProps {
  menuThumbnail: string;
  menu: Menu;
}

const MenuCard: React.FC<MenuCardProps> = ({ menuThumbnail, menu }) => {
  return (
    <div className="rounded overflow-hidden shadow-lg">
        <img className="w-full" src={menuThumbnail} alt="Mountain" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{menu.title}</div>
          <p className="text-gray-700 text-base">
            {menu.description}
          </p>
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
      </div>
  )
}

export default MenuCard;