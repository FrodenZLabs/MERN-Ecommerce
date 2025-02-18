import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#3355ff] text-white py-2">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="flex">
          <a href="/" className="text-3xl font-bold">
            Tech<span className="text-[#33ff33]">Store</span>
          </a>
        </div>
        <nav className="mt-4 md:mt-0">
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="hover:underline hover:text-[#ffdd33]">
                Home
              </a>
            </li>
            <li>
              <a
                href="/about-us"
                className="hover:underline hover:text-[#ffdd33]"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/contact-us"
                className="hover:underline hover:text-[#ffdd33]"
              >
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-[#ffdd33]">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </nav>
        <div className="flex">
          <a href="#">
            <FaFacebook className="text-2xl mx-2 hover:text-[#ffdd33]" />
          </a>
          <a href="#">
            <FaTwitter className="text-2xl mx-2 hover:text-[#ffdd33]" />
          </a>
          <a href="#">
            <FaLinkedin className="text-2xl mx-2 hover:text-[#ffdd33]" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
