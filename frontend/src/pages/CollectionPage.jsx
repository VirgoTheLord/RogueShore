import React, { useState, useEffect, useRef } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSideBar from "../components/products/FilterSideBar";
import SortOptions from "../components/products/SortOptions";
import ProductGrid from "../components/products/ProductGrid";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  useEffect(() => {
    setTimeout(() => {
      const fetchProducts = [
        {
          _id: 1,
          name: "Product 1",
          price: 100,
          images: [
            {
              url: "https://picsum.photos/500/500?random=3",
              altText: "Product 1",
            },
          ],
        },
        {
          _id: 2,
          name: "Product 2",
          price: 100,
          images: [
            {
              url: "https://picsum.photos/500/500?random=4",
              altText: "Product 2",
            },
          ],
        },
        {
          _id: 3,
          name: "Product 3",
          price: 100,
          images: [
            {
              url: "https://picsum.photos/500/500?random=5",
              altText: "Product 3",
            },
          ],
        },
        {
          _id: 4,
          name: "Product 4",
          price: 100,
          images: [
            {
              url: "https://picsum.photos/500/500?random=6",
              altText: "Product 4",
            },
          ],
        },
        {
          _id: 4,
          name: "Product 5",
          price: 100,
          images: [
            {
              url: "https://picsum.photos/500/500?random=7",
              altText: "Product 4",
            },
          ],
        },
        {
          _id: 4,
          name: "Product 6",
          price: 100,
          images: [
            {
              url: "https://picsum.photos/500/500?random=8",
              altText: "Product 4",
            },
          ],
        },
        {
          _id: 4,
          name: "Product 7",
          price: 100,
          images: [
            {
              url: "https://picsum.photos/500/500?random=9",
              altText: "Product 4",
            },
          ],
        },
        {
          _id: 4,
          name: "Product 8",
          price: 100,
          images: [
            {
              url: "https://picsum.photos/500/500?random=10",
              altText: "Product 4",
            },
          ],
        },
      ];
      setProducts(fetchProducts);
    }, 1000);
  }, []);
  return (
    <div className="flex flex-col lg:flex-row bg-white">
      <button
        onClick={toggleSidebar}
        className="lg:hidden border border-main p-2 bg-third flex justify-center items-center"
      >
        <FaFilter className="mr-2" color="#A67C68" />
      </button>

      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-64 bg-secondary overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSideBar />
      </div>
      <div className="flex-grow p-4 mt-5">
        <h2 className="text-4xl md:text-5xl text-center font-semibold uppercase mb-4">
          All Collections.
        </h2>
        <SortOptions />
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default CollectionPage;
