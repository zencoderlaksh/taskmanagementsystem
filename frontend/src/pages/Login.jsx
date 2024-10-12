import { z } from "zod";
import { apiRequest } from "../api/apiRequest";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useFormHandler } from "../customHook/useFormHandler";
import {
  LOGIN_TEXT,
  EMAIL_PLACEHOLDER,
  PASSWORD_PLACEHOLDER,
  EMAIL_LABEL,
  PASSWORD_LABEL,
} from "../constants/identifiers";

// Schema for form validation using Zod
const schema = z.object({
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const Login = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false); // For password toggle

  // Action to handle the form submission
  const onSubmitAction = async (data) => {
    const response = await apiRequest.post("/auth/login", data);
    dispatch(loginSuccess(response.token));
  };
  // Toast messages for login
  const loginMessages = {
    successTitle: "Logged in Successfully",
    successDescription: "Welcome back to the Dashboard!",
    errorTitle: "Login Failed",
    errorDescription: "Invalid email or password",
  };

  // Using the custom hook for form handling
  const { register, handleSubmit, onSubmit, errors } = useFormHandler(
    schema,
    onSubmitAction,
    loginMessages
  );

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-black">
          {LOGIN_TEXT}
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700">{EMAIL_LABEL}</label>
          <input
            {...register("email")}
            placeholder={EMAIL_PLACEHOLDER}
            className={`w-full p-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4 relative">
          <label className="block text-gray-700">{PASSWORD_LABEL}</label>
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"} // Toggle between text and password
            placeholder={PASSWORD_PLACEHOLDER}
            className={`w-full p-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-10 cursor-pointer text-gray-500"
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </span>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {LOGIN_TEXT}
        </button>

        <div className="mt-4 text-center">
          <p className="text-black">
            New User?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register Here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
