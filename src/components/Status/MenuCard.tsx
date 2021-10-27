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
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            消費カロリー 9kcal
          </span>
        </div>
      </div>
  )
}

export default MenuCard;