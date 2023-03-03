import { motion } from "framer-motion";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Carousel from "../../components/Carousel/Carousel";
import Navbar from "../../components/Navbar";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const { user, dispatch } = useContext(AuthContext);
  console.log(user);

  const animation = {
    in: { opacity: 0, x: -150 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { x: { type: "spring", duration: 1, bounce: 0.4 } },
    },
    out: {
      opacity: 0,
      x: -150,
      transition: { x: { type: "just", duration: 0.4 } },
    },
  };

  return (
    <motion.div
      variants={animation}
      initial={"in"}
      animate={"animate"}
      exit={"out"}
    >
      <div className="mx-4 md:mx-6 lg:mx-10 4xl:max-w-[1980px] 4xl:mx-auto">
        <Navbar />
      </div>
      <div className="container mx-auto px-4">
        <ul className="flex items-center py-8 gap-7 text-sm font-medium">
          <li className="text-white/50 hover:text-white transition-colors ease-in-out duration-300">
            <Link to="/games" className="">
              Browse
            </Link>
          </li>
          {!user ? (
            <>
              <li className="text-white hover:text-white transition-colors ease-in-out duration-200">
                <Link to="/auth/login">Login</Link>
              </li>
              <li className="text-white hover:text-white transition-colors ease-in-out duration-200">
                <Link to="/auth/signup">Sign up</Link>
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
                <Link to="/auth/login">Logout</Link>
              </li>
              <span className="text-white">{user.email}</span>
            </>
          )}
        </ul>
        <Carousel />
      </div>
    </motion.div>
  );
};

export default Home;
