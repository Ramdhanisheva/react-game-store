import React from "react";
import { FaGamepad, FaGoogle } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useReducer } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect } from "react";
import handleGoogleAuth from "../../utils/googleOAuth";
import Transition from "../../components/Transition";

const Signup = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect to home page if user is authenticated
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);  // Redirect user if is authenticated
  user && navigate("/")

  const initialState = { email: null, password: null, isError: null };

  const reducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_EMAIL":
        return { ...state, email: action.payload };
      case "UPDATE_PASSWORD":
        return { ...state, password: action.payload };
      case "UPDATE_CONFIRM_PASSWORD":
        return { ...state, confirmPassword: action.payload };
      case "UPDATE_ISERROR":
        return { ...state, isError: action.payload };
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  };

  const { dispatch: loginDispatch } = useContext(AuthContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { email, password, confirmPassword, isError } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      dispatch({ type: "UPDATE_ISERROR", payload: null });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      loginDispatch({ type: "login", payload: user, isRemember: true });
      navigate("/");
    } catch (error) {
      console.log(error);
      dispatch({ type: "UPDATE_ISERROR", payload: null });
    }
  };

  return (
    <Transition styles="bg-gray-50 dark:bg-zinc-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-3xl font-bold text-gray-900 dark:text-white"
        >
          <FaGamepad className="mr-2" />
          <span>Gamestore</span>
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-zinc-800 dark:border-zinc-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create and account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                  placeholder="name@company.com"
                  required
                  onChange={(e) =>
                    dispatch({ type: "UPDATE_EMAIL", payload: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                  required
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_PASSWORD",
                      payload: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                  required
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_CONFIRM_PASSWORD",
                      payload: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex items-start"></div>
              {isError && (
                <div className="flex justify-center">
                  <span className="text-error font-semibold text-sm">
                    Wrong email or password!
                  </span>
                </div>
              )}
              <button
                type="submit"
                className="w-full text-white bg-primary hover:bg-primary-focus focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary-focus dark:focus:ring-primary"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="font-medium text-primary hover:underline dark:text-primary"
                >
                  Login here
                </Link>
              </p>
            </form>
            <div className="flex justify-center">
              <span className="font-semibold">- or -</span>
            </div>
            <div>
              <button
                className="flex justify-center align-middle w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border-2 dark:border-primary dark:bg-ghost dark:hover:bg-primary dark:focus:ring-primary-800"
                onClick={() => {
                  handleGoogleAuth(auth, loginDispatch, navigate);
                }}
              >
                <FaGoogle className="mr-2 self-center" />
                <span>Continue with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Signup;
