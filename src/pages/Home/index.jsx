import React from "react";
import Navbar from "../../components/Navbar";
  import Carousel from "../../components/Carousel/Carousel";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const { user, dispatch } = useContext(AuthContext);
  console.log(user);

  return (
    <>
    <div className="mx-4 md:mx-6 lg:mx-10 4xl:max-w-[1980px] 4xl:mx-auto">
      <Navbar />
    </div>
      <div className="container mx-auto px-4">
        <ul className="flex py-8 gap-7 text-sm">
          <li className="text-white/50 hover:text-white transition-colors ease-in-out duration-200">
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
            <li className="text-white/50 hover:text-white transition-colors ease-in-out duration-200" onClick={() => {dispatch({type: "logout"})}}>
                <Link to="/auth/login">Logout</Link>
              </li>
              <span className="text-white">{user.email}</span>
            </>
          )}
        </ul>
        <Carousel />
      </div>
    </>
  );
};

export default Home;
