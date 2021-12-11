import './SeriesMenuCard.css';

const SeriesMenuCard = () => {
  return (
    <div className="series-menu-card h-full w-72 my-2 mx-2 whitespace-normal">
      <div className="series-menu-box duration-300 transform hover:translate-y-2">
        <div className="series-menu-content">
          <h2>01</h2>
          <h3>Card One</h3>
          <p className="max-w-1/4">
            Lorem ipsum dolor sit amet consectetur adipisicing 
          </p>
          <a href="#">Read More</a>
        </div>
      </div>
    </div>
  );
};

export default SeriesMenuCard;
