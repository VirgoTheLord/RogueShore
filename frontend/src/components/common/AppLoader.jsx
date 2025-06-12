import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import Loader from "./Loader/Loader"; // Assuming Loader is a separate component

const AppLoader = ({ children }) => {
  const [hideLoader, setHideLoader] = useState(
    sessionStorage.getItem("loaderShown") === "true"
  );
  const loaderRef = useRef(null);

  useEffect(() => {
    // Skip loader if already shown in this session
    if (hideLoader) return;

    const MIN_DURATION = 5000;
    const start = Date.now();

    const simulateData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated data fetch
    };

    simulateData().then(() => {
      const elapsed = Date.now() - start;
      const wait = Math.max(0, MIN_DURATION - elapsed);

      setTimeout(() => {
        if (loaderRef.current) {
          gsap.to(loaderRef.current, {
            opacity: 0,
            y: -50,
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
              setHideLoader(true);
              sessionStorage.setItem("loaderShown", "true"); // Mark loader as shown
            },
          });
        }
      }, wait);
    });
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {!hideLoader && (
        <div
          ref={loaderRef}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "#FAF0E6", // Using --color-secondary
          }}
        >
          <Loader />
        </div>
      )}
      {children}
    </div>
  );
};

export default AppLoader;
