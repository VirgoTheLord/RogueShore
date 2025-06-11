import {
  HiShoppingBag,
  HiArrowRight,
  HiOutlineCreditCard,
} from "react-icons/hi";

const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 pb-35 -mt-8 bg-white ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {[
          {
            Icon: HiShoppingBag,
            title: "Free International Shipping.",
            subtitle: "On all order over $100.00.",
            ml: "md:ml-5",
            iconClass: "bag-icon",
          },
          {
            Icon: HiArrowRight,
            title: "45 Days Return.",
            subtitle: "Money Back Guarantee.",
            ml: "",
            iconClass: "arrow-icon",
          },
          {
            Icon: HiOutlineCreditCard,
            title: "Secure Checkout.",
            subtitle: "100% Secure Checkout Process.",
            ml: "md:mr-5",
            iconClass: "cart-icon",
          },
        ].map(({ Icon, title, subtitle, ml, iconClass }, i) => (
          <div
            key={i}
            className={`flex flex-col items-center bg-secondary pt-20 pb-20 ${ml} icon-container`}
          >
            <div
              className={`p-4 rounded-full mb-4 icon transition-transform duration-300 ease-in-out ${iconClass}`}
            >
              <Icon size={40} className="text-xl" />
            </div>

            <div className="text-group transition-transform duration-300 ease-in-out">
              <h4 className="tracking-tighter text-lg mb-2">{title}</h4>
              <p className="text-gray-600 text-md tracking-tighter">
                {subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
