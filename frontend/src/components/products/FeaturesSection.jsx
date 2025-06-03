import {
  HiShoppingBag,
  HiArrowRight,
  HiOutlineCreditCard,
} from "react-icons/hi";

const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 pb-35 -mt-8 bg-white ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="flex flex-col items-center bg-secondary pt-20 pb-20 md:ml-5">
          <div className="p-4 rounded-full mb-4 ">
            <HiShoppingBag size={40} className="text-xl" />
          </div>
          <h4 className="tracking-tighter text-lg mb-2">
            Free International Shipping.
          </h4>
          <p className="text-gray-600 text-md tracking-tighter">
            On all order over $100.00.
          </p>
        </div>
        <div className="flex flex-col items-center bg-secondary pt-20 pb-20 ">
          <div className="p-4 rounded-full mb-4 ">
            <HiArrowRight size={40} className="text-xl" />
          </div>
          <h4 className="tracking-tighter text-lg mb-2">45 Days Return.</h4>
          <p className="text-gray-600 text-md tracking-tighter">
            Money Back Guarantee.
          </p>
        </div>
        <div className="flex flex-col items-center bg-secondary pt-20 pb-20 md:mr-5">
          <div className="p-4 rounded-full mb-4 ">
            <HiOutlineCreditCard size={40} className="text-xl" />
          </div>
          <h4 className="tracking-tighter text-lg mb-2">Secure Checkout.</h4>
          <p className="text-gray-600 text-md tracking-tighter">
            100% Secure Checkout Process.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
