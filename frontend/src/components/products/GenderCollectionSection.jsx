import MensCollections from "../../assets/Menc.jpg";
import WomensCollections from "../../assets/Female.jpg";
import { Link } from "react-router-dom";

const GenderCollectionSection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto pl-4 pr-4 flex flex-col md:flex-row gap-8">
        {/* Women's Collection */}
        <div className="relative flex-1 overflow-hidden rounded-2xl shadow-md">
          <img
            src={WomensCollections}
            alt="Women's Collections"
            className="w-full h-[700px] object-cover"
          />
          <div className="absolute bottom-6 left-6 bg-white/90 p-6 rounded-lg shadow backdrop-blur-sm">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
              Women's Collections.
            </h2>
            <Link
              to="/collections/all?gender=Women"
              className="text-base font-medium text-gray-900 hover:underline transition"
            >
              Shop Now.
            </Link>
          </div>
        </div>

        {/* Men's Collection */}
        <div className="relative flex-1 overflow-hidden rounded-2xl shadow-md">
          <img
            src={MensCollections}
            alt="Men's Collections"
            className="w-full h-[700px] object-cover"
          />
          <div className="absolute bottom-6 left-6 bg-white/90 p-6 rounded-lg shadow backdrop-blur-sm">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
              Men's Collections.
            </h2>
            <Link
              to="/collections/all?gender=Men"
              className="text-base font-medium text-gray-900 hover:underline transition"
            >
              Shop Now.
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
