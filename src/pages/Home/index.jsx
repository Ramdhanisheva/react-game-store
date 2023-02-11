import React from "react";
import Navbar from "../../components/Navbar";
import Carousel from "../../components/Carousel";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">
        <ul className="flex py-8 gap-7 text-sm">
          <li className="text-white/50 hover:text-white transition-colors ease-in-out duration-200"><Link to="/" className="">Browse</Link></li>
          <li className="text-white/50 hover:text-white transition-colors ease-in-out duration-200"><Link to="/">Login</Link></li>
          <li className="text-white/50 hover:text-white transition-colors ease-in-out duration-200"><Link to="/">Sign up</Link></li>
        </ul>
      <Carousel />
      </div>
    </>
  );
};

export default Home;
