import './SeriesMenuCard.css';

const SeriesMenuCard = () => {
  return (
    <div className="series-menu-card">
      <div className="series-menu-box duration-300 transform hover:translate-y-8 pointer-events-auto">
        <div className="series-menu-content">
          <h2>01</h2>
          <h3>Card One</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
            totam velit? Iure nemo labore inventore?
          </p>
          <a href="#">Read More</a>
        </div>
      </div>
    </div>
  );
};

export default SeriesMenuCard;
