import React from 'react';
import { Dropdown, Menu, message } from 'antd'; 
import { LogoutOutlined } from '@ant-design/icons'; 
import { FaRegCircleUser } from "react-icons/fa6"; // Using react-icons for the user avatar
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate()

  const handleLogout = () =>{
    localStorage.removeItem("authToken"); // Clear the token
    message.success("You have been logged out successfully.");
    navigate("/login")

  }

  const menu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={()=>handleLogout()}>
        <span className='pl-1'>Logout</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="bg-white shadow-md p-4 flex justify-end items-center">
     

      {/* Right Side: Avatar with dropdown */}
      <Dropdown overlay={menu} trigger={['click']}>
        <div className="flex items-center cursor-pointer">
        <span className="text-gray-700 max-w-[150px] truncate">Username</span>

          <FaRegCircleUser className="!text-[26px] !text-gray-600 !ml-2" />
         
        </div>
      </Dropdown>
    </div>
  );
};

export default Header;
