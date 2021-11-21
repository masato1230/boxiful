import easyMenuIcon from '../../images/easyMenuIcon.svg';
import normalMenuIcon from '../../images/normalMenuIcon.svg';
import hardMenuIcon from '../../images/hardMenuIcon.svg';
import MenuCard from './MenuCard';
import { EasyMenu, NormalMenu, HardMenu } from '../../state';
import { Fragment } from 'react';

const MenuCards = () => {
  return (
    <Fragment>
      <h2 className="text-xl mt-8 mb-3 font-bold">メニュー一覧</h2>
      <div className="pb-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {/* <!--Card 1--> */}
        <MenuCard menu={EasyMenu} menuThumbnail={easyMenuIcon} />
        {/* <!--Card 2--> */}
        <MenuCard menu={NormalMenu} menuThumbnail={normalMenuIcon} />
        {/* <!--Card 3--> */}
        <MenuCard menu={HardMenu} menuThumbnail={hardMenuIcon} />
      </div>
    </Fragment>
  );
};

export default MenuCards;
