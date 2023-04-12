import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Carousel from "../../components/Carousel/Carousel";
import Navbar from "../../components/Navbar";
import Transition from "../../components/Transition";
import { AuthContext } from "../../context/AuthContext";
import logger from "../../utils/logger";

const Home = () => {
  const { user, dispatch } = useContext(AuthContext);
  logger.debug(user);

  return (
    <Transition
      styles={"flex flex-col min-h-screen"}
      direction="left"
      duration={1}
      distance={100}
    >
      <div className="mx-4 md:mx-6 lg:mx-10 4xl:max-w-[1980px] 4xl:mx-auto">
        <Navbar />
      </div>
      <div className="container mx-auto px-4 flex flex-grow flex-col">
        <ul className="flex items-center py-8 pb-4 gap-7 text-sm font-medium">
          <li className="text-white/50 hover:text-white transition-colors ease-in-out duration-300">
            <Link to="/games" className="" data-test-id="browse">
              Browse
            </Link>
          </li>
          {!user ? (
            <>
              <li className="text-white hover:text-white transition-colors ease-in-out duration-200">
                <Link to="/auth/login" data-test-id="login">
                  Login
                </Link>
              </li>
              <li className="text-white hover:text-white transition-colors ease-in-out duration-200">
                <Link to="/auth/signup" data-test-id="sign-up">
                  Sign up
                </Link>
              </li>
            </>
          ) : (
            <>
              <li
                className="text-white/50 hover:text-white transition-colors ease-in-out duration-200"
                onClick={() => {
                  dispatch({ type: "logout" });
                }}
              >
                <Link to="/auth/login" data-test-id="logout">
                  Logout
                </Link>
              </li>
              <span className="text-white">{user.email}</span>
            </>
          )}
        </ul>
        <div className="flex items-center flex-grow mb-16">
          <Carousel />
        </div>
      </div>
    </Transition>
  );
};

export default Home;
