import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const TopBar = () => {
  return (
    <div className="bg-main text-white">
      <div className="container mx-auto flex justify-between items-center py-3 px-10">
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="hover:text-black">
            <FaLinkedinIn className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-black">
            <FaInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-black">
            <FaGithub className="h-5 w-5" />
          </a>
        </div>
        <div className="text-sm text-center grow">
          <span>We Ship Worldwide, Fast and Reliable Shipping!</span>
        </div>
        <div className="hidden md:block text-sm">
          <a href="tel:+91 9947581345" className="hover:text-gray-300">
            +91 9947581345
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
