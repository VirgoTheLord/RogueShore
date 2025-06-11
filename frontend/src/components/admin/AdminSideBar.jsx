import React from "react";
import {
  FaBoxOpen,
  FaClipboardList,
  FaSignOutAlt,
  FaStore,
  FaUser,
} from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { clearCart } from "../../redux/slices/cartSlice";

const AdminSideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <div className="h-full w-full md:w-65 bg-main text-gray-100 flex flex-col p-6">
      {/* Logo/Title */}
      <div className="mb-6">
        <Link to="/admin" className="text-2xl font-semibold md:text-xl">
          RogueShore.
        </Link>
      </div>
      <h2 className="text-lg font-medium mb-6 text-center md:text-lg mr-12 md:mr-8">
        Admin Dashboard.
      </h2>

      {/* Navigation */}
      <nav className="flex flex-col space-y-2 flex-grow">
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `flex items-center space-x-3 py-3 px-4 rounded transition-colors duration-200 ${
              isActive
                ? "bg-third text-main"
                : "text-white hover:bg-third hover:text-main"
            }`
          }
        >
          <FaUser />
          <span>Users</span>
        </NavLink>
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `flex items-center space-x-3 py-3 px-4 rounded transition-colors duration-200 ${
              isActive
                ? "bg-third text-main"
                : "text-white hover:bg-third hover:text-main"
            }`
          }
        >
          <FaBoxOpen />
          <span>Products</span>
        </NavLink>
        <NavLink
          to="/admin/order"
          className={({ isActive }) =>
            `flex items-center space-x-3 py-3 px-4 rounded transition-colors duration-200 ${
              isActive
                ? "bg-third text-main"
                : "text-white hover:bg-third hover:text-main"
            }`
          }
        >
          <FaClipboardList />
          <span>Orders</span>
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center space-x-3 py-3 px-4 rounded transition-colors duration-200 ${
              isActive
                ? "bg-third text-main"
                : "text-white hover:bg-third hover:text-main"
            }`
          }
        >
          <FaStore />
          <span>Shop</span>
        </NavLink>
      </nav>

      {/* Logout Button */}
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center space-x-3 transition-colors duration-200"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSideBar;
