import React from "react";
import Navbar from "../../components/Navbar";
import Carousel from "../../components/Carousel";
import { Link } from "react-router-dom";
import { useContext } from "react";
import {AuthContext} from "../../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext)
  console.log(user)  
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">
        <ul className="flex py-8 gap-7 text-sm">
          <li className="text-white/50 hover:text-white transition-colors ease-in-out duration-200"><Link to="/" className="">Browse</Link></li>
          <li className="text-white/50 hover:text-white transition-colors ease-in-out duration-200"><Link to="/auth/login">Login</Link></li>
          <li className="text-white/50 hover:text-white transition-colors ease-in-out duration-200"><Link to="/">Sign up</Link></li>
        </ul>
      <Carousel />
      </div>
    </>
  );
};

export default Home;
