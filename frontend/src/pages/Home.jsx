import Hero from "../components/layout/Hero";
import FeaturedCollection from "../components/products/FeaturedCollection";
import FeaturesSection from "../components/products/FeaturesSection";
import GenderCollectionSection from "../components/products/GenderCollectionSection";
import NewArrivals from "../components/products/NewArrivals";
import ProductDetails from "../components/products/ProductDetails";
import ProductGrid from "../components/products/ProductGrid";

const placeholderProducts = [
  {
    _id: 1,
    name: "Product 1",
    price: 100,
    images: [
      { url: "https://picsum.photos/500/500?random=3", altText: "Product 1" },
    ],
  },
  {
    _id: 2,
    name: "Product 2",
    price: 100,
    images: [
      { url: "https://picsum.photos/500/500?random=4", altText: "Product 2" },
    ],
  },
  {
    _id: 3,
    name: "Product 3",
    price: 100,
    images: [
      { url: "https://picsum.photos/500/500?random=5", altText: "Product 3" },
    ],
  },
  {
    _id: 4,
    name: "Product 4",
    price: 100,
    images: [
      { url: "https://picsum.photos/500/500?random=6", altText: "Product 4" },
    ],
  },
  {
    _id: 4,
    name: "Product 5",
    price: 100,
    images: [
      { url: "https://picsum.photos/500/500?random=7", altText: "Product 4" },
    ],
  },
  {
    _id: 4,
    name: "Product 6",
    price: 100,
    images: [
      { url: "https://picsum.photos/500/500?random=8", altText: "Product 4" },
    ],
  },
  {
    _id: 4,
    name: "Product 7",
    price: 100,
    images: [
      { url: "https://picsum.photos/500/500?random=9", altText: "Product 4" },
    ],
  },
  {
    _id: 4,
    name: "Product 8",
    price: 100,
    images: [
      { url: "https://picsum.photos/500/500?random=10", altText: "Product 4" },
    ],
  },
];
const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />
      {/* Best Sellers */}
      <h2 className="text-5xl text-center font-bold pb-4 pt-15  bg-white">
        Best Sellers.
      </h2>
      <ProductDetails />
      <div className="container mx-auto gap-4 pb-15 bg-secondary pt-10 pl-4 pr-4">
        <h2 className="text-5xl text-center font-bold mb-20 mt-6 ml-1 md:ml-0">
          Top Wears For Women.
        </h2>
        <ProductGrid products={placeholderProducts} />
      </div>
      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};

export default Home;
