import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNewArrivals();
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleMouseUp = (e) => {
    setIsDragging(false);
  };
  const handleMouseLeave = () => {};

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -372 : 372;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const buffer = 2;

      setCanScrollLeft(leftScroll > buffer);
      setCanScrollRight(
        Math.ceil(leftScroll) < Math.floor(maxScrollLeft) - buffer
      );
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => {
        container.removeEventListener("scroll", updateScrollButtons);
      };
    }
  }, [newArrivals]);
  return (
    <section className="px-4 py-16 pl-4 pr-4 bg-secondary">
      <div className="max-w-full mx-auto text-center mb-10">
        <h2 className="text-5xl font-bold mb-4">Explore New Arrivals.</h2>
        <p className="text-lg text-gray-600 mb-6 md:mb-0">
          Discover the latest trends and styles in our New Arrivals collection.
        </p>

        <div className="flex justify-end space-x-2 mb-6">
          <button
            className={`p-2 rounded border ${
              canScrollLeft
                ? "bg-main text-white shadow hover:bg-third hover:text-white transition"
                : "bg-secondary text-gray-400 cursor-not-allowed"
            }`}
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            className={`p-2 rounded border ${
              canScrollRight
                ? "bg-main text-white shadow hover:bg-third hover:text-white  transition"
                : "bg-secondary text-gray-400 cursor-not-allowed"
            }`}
            onClick={() => scroll("right")}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>

        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          ref={scrollRef}
          className={`flex space-x-3 overflow-x-auto scroll-hidden ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {newArrivals.map((item) => (
            <div
              key={item._id}
              className="min-w-[360px] md:min-w-[400px] max-w-[420px] rounded-xl overflow-hidden shadow hover:shadow-xl transition relative bg-white"
            >
              <img
                src={item.images[0]?.url}
                alt={item.images[0]?.altText || item.name}
                className="w-full h-[500px] object-cover"
                draggable="false"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white p-4 text-left">
                <Link to={`/product/${item._id}`}>
                  <h4 className="font-semibold text-lg">{item.name}</h4>
                  <p className="text-md mt-1">${item.price}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
