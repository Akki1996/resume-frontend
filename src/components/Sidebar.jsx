import { NavLink } from 'react-router-dom';
import { FaHome, FaUser } from 'react-icons/fa'; 
import ReactLogo from '../assets/react.svg'; 
const Sidebar = () => {
  return (
    <div className="fixed inset-y-0 left-0 w-16 lg:w-64 bg-blue-600 text-white shadow-lg transition-all duration-300 ease-in-out">

      <div className="flex items-center justify-center py-6">
        <img src={ReactLogo} alt="Logo" className="h-8 w-8 lg:h-12 lg:w-12" />
      </div>

      <ul className="mt-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center px-4 lg:px-6 py-3 text-[16px] font-medium  hover:bg-blue-400 text-white transition duration-200 ${
                  isActive ? 'bg-blue-300 text-white' : ''
                }`
              }
            >
              <FaHome className="w-5 h-5 lg:mr-3 !text-[30px]" />
              <span className="hidden lg:inline">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center px-4 lg:px-6 py-3 text-[16px] font-medium  hover:bg-blue-400 text-white transition duration-200 ${
                  isActive ? 'bg-blue-300 text-white' : ''
                }`
              }
            >
              <FaUser className="w-5 h-5 lg:mr-3" />
              <span className="hidden lg:inline">Profile</span>
            </NavLink>
          </li>
          </ul>
    </div>
  );
};

export default Sidebar;