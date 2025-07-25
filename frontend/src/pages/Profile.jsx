import React, { useEffect } from "react";
import MyOrdersPage from "./MyOrdersPage";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import { clearCart } from "../redux/slices/cartSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-grow container mx-auto p-4 md:p-6 mt-5">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 ">
          {/* Left Section */}
          <div className="w-full md:w-1/3 lg:w-1/4 shadow-md shadow-third rounded-lg p-6 bg-secondary mt-5">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              {user?.name}
            </h1>
            <p className="text-lg text-gray-600 mb-4 ">{user?.email}</p>
            <button
              className="w-full bg-main text-white py-2 px-4 rounded hover:bg-third"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
          {/* Right */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <MyOrdersPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
