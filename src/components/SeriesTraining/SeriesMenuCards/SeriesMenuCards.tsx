import SeriesMenuCard from "./SeriesMenuCard";

const SeriesMenuCards = () => {
  return (
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
  );
};

export default SeriesMenuCards;
