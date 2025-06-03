import {
  HiShoppingBag,
  HiArrowRight,
  HiOutlineCreditCard,
} from "react-icons/hi";

const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 mb-20 -mt-8 bg-white ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-4 ">
            <HiShoppingBag className="text-xl" />
          </div>
          <h4 className="tracking-tighter mb-2">
            Free International Shipping.
          </h4>
          <p className="text-gray-600 text-sm tracking-tighter">
            On all order over $100.00.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-4 ">
            <HiArrowRight className="text-xl" />
          </div>
          <h4 className="tracking-tighter mb-2">45 Days Return.</h4>
          <p className="text-gray-600 text-sm tracking-tighter">
            Money Back Guarantee.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-4 ">
            <HiOutlineCreditCard className="text-xl" />
          </div>
          <h4 className="tracking-tighter mb-2">Secure Checkout.</h4>
          <p className="text-gray-600 text-sm tracking-tighter">
            100% Secure Checkout Process.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
