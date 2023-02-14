import React from "react";
import { useState, useEffect } from "react";
import { FaGamepad, FaGoogle } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import handleGoogleAuth from "../../utils/googleOAuth";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isRemember, setIsRemember] = useState(true);
  const [isError, setIsError] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);

    async function signIn() {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          formJson.email,
          formJson.password
        );
        const user = userCredential.user;
        console.log(user);
        dispatch({
          type: "login",
          payload: user,
          isRemember: formJson.isRemember || false,
        });
        navigate("/");
      } catch (error) {
        setIsError(true);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    }
    signIn();
  };

  useEffect(() => {
    console.log(email, password, isRemember);
  }, [email, password, , isRemember]);

  return (
    <section className="bg-gray-50 dark:bg-zinc-900">
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
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleSubmit}
            >
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                  onChange={(e) => setEmail((prevState) => e.target.value)}
                  required
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setPassword((prevState) => e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      name="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      onChange={(e) =>
                        setIsRemember((prevState) => e.target.checked)
                      }
                      checked={isRemember}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              {isError && (
                <div className="flex justify-center">
                  <span className="text-error font-semibold text-sm">
                    Wrong email or password!
                  </span>
                </div>
              )}
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary-focus dark:focus:ring-primary"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?
                <Link
                  to="/auth/signup"
                  className="ml-1 font-medium text-primary-600 text-primary hover:underline dark:text-primary-500"
                >
                  Sign up
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
                  handleGoogleAuth(auth, dispatch, navigate);
                }}
              >
                <FaGoogle className="mr-2 self-center" />
                <span>Continue with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
