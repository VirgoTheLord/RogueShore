import { Link } from "react-router-dom";
import { HiOutlineUser, HiOutlineShoppingBag } from "react-icons/hi";
import { HiBars3 } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import SearchBar from "./SearchBar";
import CartDrawer from "../layout/CartDrawer";
import { useState } from "react";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const toggleCartDrawer = () => setDrawerOpen(!drawerOpen);
  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen);

  const navLinks = ["Men", "Women", "Top Wear", "Bottom Wear"];

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6 bg-secondary">
        <Link to="/" className="md:text-2xl text-xl font-medium">
          RogueShore.
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((label) => (
            <Link
              key={label}
              to="collections/all"
              className="text-sm font-medium uppercase text-gray-700 hover:text-black"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Icons + Search */}
        <div className="flex items-center space-x-4">
          <Link
            to="/admin"
            className="hidden md:block bg-main px-2 py-1 rounded text-sm  text-white"
          >
            Admin
          </Link>
          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="md:w-6 md:h-6 w-5 h-5 text-gray-700" />
          </Link>

          <button
            onClick={toggleCartDrawer}
            className="relative hover:text-black"
          >
            <HiOutlineShoppingBag className="md:w-6 md:h-6 w-5 h-5 text-gray-700" />
            <span className="absolute md:-top-1.5 md:left-3 -top-2 bg-main text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
              4
            </span>
          </button>

          <SearchBar />

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleNavDrawer}>
            <HiBars3 className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-3/4 sm:w-1/2 md:w-1/3 bg-secondary shadow-lg transform transition-transform duration-300 md:hidden ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-4">
          <h2 className="mb-10 text-3xl font-semibold">Menu.</h2>
          <nav className="space-y-4">
            {navLinks.map((label) => (
              <Link
                key={label}
                to="/collections/all"
                onClick={toggleNavDrawer}
                className="block text-gray-600 hover:text-black"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
