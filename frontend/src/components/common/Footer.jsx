import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-5 pt-10 px-10 bg-secondary">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-25 px-4 lg:px-0">
        <div>
          <h3 className="text-lg text-black mb-4">Newsletter.</h3>
          <p className="text-gray-500 mb-4">
            Be the first to hear about new products, special offers, and more.
          </p>
          <p className="font-medium text-sm text-gray-600 mb-6">
            Sign up and get 10% off for your first order.
          </p>
          <form className="flex ">
            <input
              type="email"
              placeholder="Enter your email."
              className="p-3 w-full text-xs border-t border-l border-b border-gray-300 rounded-lg-md placeholder:text-sm focus:outline-none focus:ring focus:ring-gray-500 transition-all "
              required
            />
            <button
              type="submit"
              className="bg-main text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div>
          <h3 className="text-lg text-black mb-4">Shop.</h3>
          <ul className="space-y-2 text-gray-500 ">
            <li>
              <Link to="#" className="hover:text-gray-400 transition-colors">
                Men's Top Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-400 transition-colors">
                Women's Top Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-400 transition-colors">
                Men's Bottom Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-400 transition-colors">
                Women's Bottom Wear
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg text-black mb-4">Support.</h3>
          <ul className="space-y-2 text-gray-500 ">
            <li>
              <Link to="#" className="hover:text-gray-400 transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-400 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-400 transition-colors">
                FAQ'S
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-400 transition-colors">
                Features
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg text-black mb-4">Follow Us</h3>
          <div className="flex items-center space-x-4 mb-6">
            <a
              href="https://www.linkedin.com/in/alwin-aby-mathew/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-main"
            >
              <FaLinkedin className="h-6 w-6 " />
            </a>
            <a
              href="https://www.linkedin.com/in/alwin-aby-mathew/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-main"
            >
              <FaGithub className="h-6 w-6 " />
            </a>
            <a
              href="https://www.linkedin.com/in/alwin-aby-mathew/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-main"
            >
              <FaInstagram className="h-6 w-6 " />
            </a>
          </div>
          <p className="text-lg text-black">Call us</p>
          <p className="mt-2">
            <FiPhoneCall className="inline-block mr-2 " />
            +91 9947581345
          </p>
        </div>
      </div>
      <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-600 pt-3">
        <p className="text-gray-500 text-sm tracking-tighter text-center">
          Copyright 2025, Alwin Mathew. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
