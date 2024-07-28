import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import axios from "axios";
import beeImage from "/public/images/bee.png";

import Swal from "sweetalert2";
import ThemeToggle from "../Components/ThemeToggle";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}User/login`, {
        username: data.username,
        password: data.password,
      });

      if (response.status === 200) {
        const userRole = response.data.user;
        console.log(userRole);

        dispatch(login({ role: userRole.role }));

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome, ${userRole.role}!`,
          confirmButtonText: "Okay",
        }).then((result) => {
          if (result.isConfirmed) {
            if (response.data.user === "admin") {
              navigate("/admin");
            } else {
              navigate("/home");
            }
          }
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Incorrect username or password",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center lg:flex-row lg:justify-center lg:gap-24 lg:mt-[-100px] overflow-hidden">
        <div className="md:w-96 lg:w-1/2 xl:w-1/4 z-10">
          <div className="flex flex-col items-center">
            <img src={beeImage} alt="bee" className="w-3/4 mt-12" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-black dark:text-white">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-gray-50 dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium dark:text-white"
                  >
                    Username
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      {...register("username", {
                        required: "Username is required",
                        minLength: {
                          value: 5,
                          message:
                            "Username must be at least 5 characters long",
                        },
                      })}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150 ease-in-out sm:text-sm text-black"
                    />
                  </div>
                  {errors.username && (
                    <p className="text-red-500 text-sm">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium dark:text-white"
                  >
                    Password
                  </label>
                  <div className="mt-1 rounded-md shadow-sm">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150 ease-in-out sm:text-sm text-black"
                    />
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium  hover:text-blue-400 dark:text-white"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md dark:text-white bg-blue-500 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-700 transition duration-150 ease-in-out"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
