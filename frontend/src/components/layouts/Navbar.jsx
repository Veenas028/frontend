import React, { useState, useContext } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";

const Navbar = ({ activeMenu }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const { user, clearUser } = useContext(UserContext);

  const randomNumber = Math.floor(Math.random() * 90) + 1;
  const avatarUrl = `https://avatar.iran.liara.run/public/${randomNumber}`;

  const handleClick = (route) => {
    if (route === "logout") {
      localStorage.clear();
      clearUser();
      navigate("/login");
    } else {
      navigate(route);
    }
    setOpenMenu(false); // Close menu on click
  };

  return (
    <div className="bg-white border-b border-gray-200/50 py-4 px-5 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-black">Expense Tracker</h2>
        <button
          className="lg:hidden text-black"
          onClick={() => setOpenMenu(!openMenu)}
        >
          {openMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>
      </div>

      {openMenu && (
        <div className="mt-4 bg-white border border-gray-200 p-4 rounded-lg lg:hidden">
          <div className="flex flex-col items-center gap-2 mb-4">
            <img
              src={avatarUrl}
              alt="Profile"
              className="w-16 h-16 rounded-full bg-gray-300"
            />
            {user?.name && (
              <h5 className="text-gray-800 font-medium text-center">
                {user.name}
              </h5>
            )}
          </div>
          {SIDE_MENU_DATA.map((item, index) => (
          <div key={index} className="mb-2">
  <button
    onClick={() => handleClick(item.path)}
    className={`flex items-center gap-3 px-4 py-2 rounded-md text-base ${
      activeMenu === item.label
        ? "bg-indigo-700 text-white"
        : "text-gray-800 hover:bg-gray-100"
    }`}
  >
    <item.icon className="text-lg" />
    <span>{item.label}</span>
  </button>
</div>

          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
