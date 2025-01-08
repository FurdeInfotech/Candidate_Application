import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const SuccessSVG: React.FC = () => {
  // Circle animation with spring
  const circleVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  // Checkmark animation with spring (scaling from 0 to 1.5, then to 1)
  const checkVariants = {
    hidden: { pathLength: 0, scale: 0 },
    visible: {
      pathLength: 1,
      scale: [0, 1.5, 1], // Animate from scale 0 to 1.5, then to 1
      transition: {
        duration: 1.2,
        ease: "easeInOut",
        delay: 0.5,
        type: "spring",
        stiffness: 150,
        damping: 20,
      },
    },
  };

  // Ref for the element and useInView hook
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-10% 0px" });

  // State to handle "trigger once" functionality
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    if (isInView) {
      setHasBeenInView(true);
    }
  }, [isInView]);

  return (
    <div
      ref={ref}
      style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width="150"
        height="150"
        initial="hidden"
        animate={hasBeenInView ? "visible" : "hidden"} // Trigger animation based on state
      >
        {/* Animated Circle with black fill */}
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          fill="black"
          variants={circleVariants}
        />
        {/* Animated Check with white stroke */}
        <motion.path
          d="M35 50 L45 60 L65 40"
          stroke="white"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          variants={checkVariants}
        />
      </motion.svg>
    </div>
  );
};

export default SuccessSVG;
