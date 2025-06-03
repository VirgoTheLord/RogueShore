import TopBar from "../layout/TopBar";
import Navbar from "../common/Navbar";
import CartDrawer from "../layout/CartDrawer";

const Header = () => {
  return (
    <header className="border-b border-gray-200 shadow-sm">
      <TopBar />
      <Navbar />
    </header>
  );
};

export default Header;
