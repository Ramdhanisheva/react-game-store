import { motion } from "framer-motion";

const Transition = ({
  direction = "none",
  duration = 1,
  distance = 50,
  bounce = 0.4,
  styles,
  children,
}) => {
  const directions = {
    left: { x: -distance },
    right: { x: distance },
    up: { y: -distance },
    down: { y: distance },
    none: { x: 0, y: 0 },
  };

  const transitionIn = {
    x: {
      type: "spring",
      bounce: bounce,
      duration: duration,
    },
    y: {
      type: "spring",
      bounce: bounce,
      duration: duration,
    },
  };

  const transitionOut = {
    x: {
      type: "just",
      duration: 0.3 * duration,
    },
    y: {
      type: "just",
      duration: 0.3 * duration,
    },
  };

  const animation = {
    in: { ...directions[direction], opacity: 0 },
    animate: {
      opacity: 1,
      ...directions["none"],
      transition: { ...transitionIn },
    },
    out: {
      opacity: 0,
      ...directions[direction],
      transition: { ...transitionOut },
    },
  };

  return (
    <motion.div
      variants={animation}
      initial={"in"}
      animate={"animate"}
      exit={"out"}
      className={styles}
    >
      {children}
    </motion.div>
  );
};

export default Transition;
