import easyMenuIcon from '../../images/easyMenuIcon.svg';
import normalMenuIcon from '../../images/normalMenuIcon.svg';
import hardMenuIcon from '../../images/hardMenuIcon.svg';
import MenuCard from './MenuCard';
import { EasyMenu, NormalMenu, HardMenu } from '../../state';

const MenuCards = () => {
  return (
    <div className="pt-5 pb-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
      {/* <!--Card 1--> */}
      <MenuCard menu={EasyMenu} menuThumbnail={easyMenuIcon} />
      {/* <!--Card 2--> */}
      <MenuCard menu={NormalMenu} menuThumbnail={normalMenuIcon} />
      {/* <!--Card 3--> */}
      <MenuCard menu={HardMenu} menuThumbnail={hardMenuIcon} />
    </div>
  );
};

export default MenuCards;
