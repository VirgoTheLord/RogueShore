import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";

const SelectedProduct = {
  name: "Stylish Jacket.",
  price: 120,
  originalPrice: 150,
  description: "A stylish jacket for all occasions.",
  brand: "BrandName",
  material: "Cotton",
  sizes: ["S", "M", "L", "XL"],
  colors: ["Red", "Blue", "Black"],
  images: [
    {
      url: "https://picsum.photos/500/650?random=1",
      altText: "Stylish Jacket 1",
    },
    {
      url: "https://picsum.photos/500/650?random=2",
      altText: "Stylish Jacket 2",
    },
  ],
};

const similarProducts = [
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
];

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState(
    SelectedProduct?.images?.[0]?.url || null
  );
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleQuantityChange = (op) => {
    if (op == "plus") {
      setQuantity((prev) => prev + 1);
    }
    if (op == "minus" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color.", { duration: 2000 });
      return;
    }
    setIsButtonDisabled(true);
    setTimeout(() => {
      toast.success("Product added to cart successfully!", { duration: 2000 });
      setIsButtonDisabled(false);
    }, 2000);
  };
  useEffect(() => {
    if (SelectedProduct?.images?.length > 0) {
      setMainImage(SelectedProduct.images[0].url);
    }
  }, [SelectedProduct]);
  return (
    <div className="md:p-4 ">
      <div className="max-w-6xl  mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* Left Thumbnails */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {SelectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg border cursor-pointer ${
                  mainImage === image.url
                    ? "border-2 border-main"
                    : "border-none"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>
          {/* Main Image */}
          <div className="md:w-1/2">
            <div className="mb-4">
              <img
                src={mainImage}
                alt="Main Product"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4">
            {SelectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg border cursor-pointer ${
                  mainImage === image.url ? "border-main" : "border-none"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>
          {/* right section */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {SelectedProduct.name}
            </h1>
            <p className="text-md text-gray-600 mb-1 line-through">
              $
              {SelectedProduct.originalPrice &&
                `${SelectedProduct.originalPrice}`}
            </p>
            <p className="text-2xl text-gray-800 mb-2">
              ${SelectedProduct.price}
            </p>
            <p className="text-gray-600 mb-4">{SelectedProduct.description}</p>
            <div className="mb-4">
              <p className="text-gray-700">Color:</p>
              <div className="flex gap-2 mt-2">
                {SelectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border ${
                      selectedColor === color
                        ? "border-5 border-third"
                        : "border-none"
                    }`}
                    style={{
                      backgroundColor: color.toLocaleLowerCase(),
                      filter: "brightness(0.75)",
                    }}
                  ></button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <p className="text-gray-700">Size:</p>
              <div className="flex gap-2 mt-2">
                {SelectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded border border-third hover:bg-secondary hover:text-black ${
                      selectedSize === size
                        ? "bg-main text-white hover:bg-main"
                        : "border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <p className="text-gray-700">Quantity:</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={() => handleQuantityChange("minus")}
                  className="px-3 py-1 bg-secondary hover:bg-third rounded text-lg "
                >
                  -
                </button>
                <span className="text-lg -mt-1">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("plus")}
                  className="px-3 py-1 bg-secondary hover:bg-third rounded text-lg "
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`bg-main text-white py-2 px-6 rounded w-full mb-4 ${
                isButtonDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-third hover:text-black"
              }`}
            >
              {isButtonDisabled ? "Adding to cart..." : "Add to Cart"}
            </button>
            <div className="mt-10 text-gray-700">
              <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-1 font-semibold">Brand: </td>
                    <td className="py-1">{SelectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-semibold">Material: </td>
                    <td className="py-1">{SelectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-20 mb-10 ">
          <h2 className="text-2xl text-center font-semibold mb-4">
            You May Also Like...
          </h2>
          <ProductGrid products={similarProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
