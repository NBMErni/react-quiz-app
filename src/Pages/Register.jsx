import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(BASE_URL + "User/register", {
        username: data.username,
        password: data.password,
        role: "user",
      });
      console.log(response);
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "User was registered",
          text: `Press Okay to redirect to login page!`,
          confirmButtonText: "Okay",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      }
    } catch (error) {
      console.log("err", error);
      Swal.fire({
        icon: "error",
        title: "User was not registered",
        text: "Please check the inputs",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="min-h-screen  flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold ">
          Register an account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className=" py-8 px-4 shadow sm:rounded-lg sm:px-10 bg-gray-50">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-5"
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
                  })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
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
                className="block text-sm font-medium leading-5 "
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
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                >
                  Submit
                </button>
              </span>
            </div>
          </form>
          <div className="mt-10 text-center text-sm">
            Already have an account?
            <a href="/" className="text-blue-500 underline ml-1">
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
