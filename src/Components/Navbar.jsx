import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (isAuthenticated) {
      dispatch(logout());
      navigate("/");
    }
  };

  return (
    <div className="flex justify-between mx-3 mt-5 items-center">
      <div className="navbar-left">
        <span>{`Welcome ${user ? user.user : "Guest"}`}</span>
      </div>
      <div className="navbar-right">
        <button
          onClick={handleAuthClick}
          className="px-3 py-2 bg-blue-500 rounded-md text-white"
        >
          {isAuthenticated ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
