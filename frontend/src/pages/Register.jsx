import { z } from "zod";
import { apiRequest } from "../api/apiRequest";
import { useDispatch } from "react-redux";
import { registerSuccess } from "../redux/authSlice";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useFormHandler } from "../customHook/useFormHandler";
import {
  REGISTER_TEXT,
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

const Register = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  // Action to handle the form submission
  const onSubmitAction = async (data) => {
    const response = await apiRequest.post("/auth/signup", data);
    dispatch(registerSuccess(response.token));
  };
  // Toast messages for registration
  const registerMessages = {
    successTitle: "Signed up Successfully",
    successDescription: "Welcome to the Dashboard!",
    errorTitle: "Registration Failed",
    errorDescription: "User already exists",
  };

  // Using the custom hook for form handling
  const { register, handleSubmit, onSubmit, errors } = useFormHandler(
    schema,
    onSubmitAction,
    registerMessages
  );

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-semibold text-black text-center mb-6">
          {REGISTER_TEXT}
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
        <div className="mb-4">
          <label className="block text-gray-700">{PASSWORD_LABEL}</label>
          <div className="relative">
            <input
              {...register("password")}
              placeholder={PASSWORD_PLACEHOLDER}
              type={showPassword ? "text" : "password"}
              className={`w-full p-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            <span
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </span>
          </div>
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
          {REGISTER_TEXT}
        </button>

        <p className="mt-4 text-center text-black">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login Here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
