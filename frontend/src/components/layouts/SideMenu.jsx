import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { SIDE_MENU_DATA } from "../../utils/data";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  const randomNumber = Math.floor(Math.random() * 90) + 1;
  const avatarUrl = `https://avatar.iran.liara.run/public/${randomNumber}`;

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    } else {
      navigate(route);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="w-52 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 sticky top-[61px]">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-5">
        <img
          src={avatarUrl}
          alt="Profile"
          className="w-20 h-20 bg-slate-400 rounded-full"
        />
        {user?.name && (
          <h5 className="text-gray-950 font-medium leading-6">
            {user.name}
          </h5>
        )}
      </div>
      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full cursor-pointer flex items-center gap-4 text-[17px] ${
            activeMenu === item.label ? "text-white bg-indigo-700" : ""
          } py-3 px-8 rounded-lg mb-3`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
