import { Link } from "react-router-dom";
import { FiHome, FiShoppingCart, FiClipboard, FiUser } from "react-icons/fi";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#3355ff] text-white py-10 px-6 flex flex-col items-center">
      {/* Centered Title */}
      <h2 className="text-4xl font-semibold mb-8 text-center uppercase">
        Tech<span className="text-[#33ff33] italic">Store</span>
      </h2>

      <nav className="w-full">
        <ul className="w-full">
          <li className="mb-4">
            <Link
              to="/dashboard"
              className="flex items-center text-black uppercase font-bold gap-x-2 px-8 py-4 rounded-lg bg-[#ffdd33] hover:bg-white"
            >
              <FiHome size={24} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/products"
              className="flex items-center text-black uppercase font-bold gap-x-2 px-8 py-4 rounded-lg bg-[#ffdd33] hover:bg-white"
            >
              <FiShoppingCart size={24} />
              <span>Products</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/loan-status"
              className="flex items-center text-black uppercase font-bold gap-x-2 px-8 py-4 rounded-lg bg-[#ffdd33] hover:bg-white"
            >
              <FiClipboard size={24} />
              <span>Loan Status</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/profile"
              className="flex items-center text-black uppercase font-bold gap-x-2 px-8 py-4 rounded-lg bg-[#ffdd33] hover:bg-white"
            >
              <FiUser size={24} />
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
