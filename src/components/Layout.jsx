import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar with responsive width */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />

        <div className="flex-1 p-6 overflow-y-auto ml-16 lg:ml-64">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
