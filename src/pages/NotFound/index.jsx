import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Transition from "../../components/Transition";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Transition
      direction="up"
      distance={100}
      bounce={0.4}
      styles="bg-white dark:bg-zinc-900 min-h-screen flex justify-center items-center"
    >
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary dark:text-primary">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            Something's missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.{" "}
          </p>
          <p className="mb-4 mt-14 text-lg font-normal text-gray-500 dark:text-zinc-300">
            Redirecting back to the home page...
          </p>
          <motion.div
            className="h-[6px] bg-primary rounded-xl"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 4 }}
          />
        </div>
      </div>
    </Transition>
  );
};

export default NotFound;
