import React, { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import imagesLoaded from "imagesloaded";
import { useLocation } from "react-router-dom";

const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1.1,
    });

    lenisRef.current = lenis;

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    imagesLoaded(document.body, { background: true }, () => {
      console.log("All images loaded");
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  // Scroll to top on location change (page navigation)
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, {
        duration: 1.8,
        easing: (t) =>
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2, // easeInOutCubic
      });
    }
  }, [location]);

  return <>{children}</>;
};

export default SmoothScroll;
