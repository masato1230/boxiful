import { Link } from 'react-router-dom';

const Header = () => {
  // return (
  //   <div>
  //     <h1>Boxiful</h1>
  //     <ul>
  //       <li><Link to="/status">Status</Link></li>
  //       <li><Link to="/training">Training</Link></li>
  //     </ul>
  //   </div>
  // )
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              {/* <!-- Website Logo --> */}
              <a href="#" className="flex items-center py-4 px-2">
                <img src="logo.png" alt="Logo" className="h-8 w-8 mr-2" />
                <span className="font-semibold text-gray-500 text-lg">
                  Navigation
                </span>
              </a>
            </div>
            {/* <!-- Primary Navbar items --> */}
            <div className="hidden md:flex items-center space-x-1">
              <a
                href=""
                className="py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold "
              >
                Home
              </a>
              <a
                href=""
                className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
              >
                Services
              </a>
              <a
                href=""
                className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
              >
                About
              </a>
              <a
                href=""
                className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
          {/* <!-- Secondary Navbar items --> */}
          <div className="hidden md:flex items-center space-x-3 ">
            <a
              href=""
              className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300"
            >
              Log In
            </a>
            <a
              href=""
              className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
