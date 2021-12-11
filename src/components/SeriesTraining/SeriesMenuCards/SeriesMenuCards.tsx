import SeriesMenuCard from './SeriesMenuCard';

const SeriesMenuCards = () => {
  return (
    <div className="text-white h-full ml-5 mb-5">
      <h3>次のメニュー</h3>
      <ul className="overflow-x-scroll whitespace-nowrap h-full flex w-screen">
        <li className="h-full inline-block">
          <SeriesMenuCard />
        </li>
        <li className="h-full inline-block">
          <SeriesMenuCard />
        </li>
        <li className="h-full inline-block">
          <SeriesMenuCard />
        </li>
        <li className="h-full inline-block">
          <SeriesMenuCard />
        </li>
        <li className="h-full inline-block">
          <SeriesMenuCard />
        </li>
        <li className="h-full inline-block">
          <SeriesMenuCard />
        </li>
        <li className="h-full inline-block">
          <SeriesMenuCard />
        </li>
      </ul>
    </div>
  );
};

export default SeriesMenuCards;
