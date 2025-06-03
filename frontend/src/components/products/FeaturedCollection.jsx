import React from "react";
import { Link } from "react-router-dom";
import featured from "../../assets/featured1.jpg"; // Adjust the path as necessary

const FeaturedCollection = () => {
  return (
    <section className="py-16 px-4 mt-5 bg-white">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-secondary rounded-3xl">
        <div className="lg:w-1/2 p-8 text-center lg:text-left">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Timeless Sophistication.
          </h2>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Style for Every Moment.
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Explore a curated collection of garments crafted with elegance and
            precision. Whether you're dressing for a grand occasion or embracing
            everyday refinement, our pieces embody grace, comfort, and enduring
            style.
          </p>
          <Link
            to="/collections/all"
            className="text-md underline-hover underline-hover font-semibold"
          >
            Shop the Collection.
          </Link>
        </div>
        <div className="lg:w-1/2">
          <img
            src={featured}
            alt="Featured Collection"
            className="w-full h-[775px] object-cover lg:rounded-tr-3xl lg:rounded-br-3xl rounded-tr-2xl rounded-tl-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
