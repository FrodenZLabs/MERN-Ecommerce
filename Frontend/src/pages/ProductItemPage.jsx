import { useEffect, useState } from "react";
import { FaCheck, FaMinus, FaPlus, FaRegHeart } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { data } from "../constants/data";

const ProductItemPage = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(null);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const foundProduct = data.find((item) => item.id === parseInt(id, 10));
    setProduct(foundProduct);

    if (foundProduct && foundProduct.images && foundProduct.images.length > 0) {
      setMainImage(foundProduct.images[0]); // Set the first image from the images array
    }
  }, [id]);

  console.log(product);
  // Handle missing product
  if (!product) {
    return <h1 className="text-4xl text-center mt-20">Product not found!</h1>;
  }

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    } else if (e.target.value === "") {
      setQuantity("");
    }
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  const renderTabContent = () => {
    if (activeTab === "description") {
      return (
        <div className="bg-white px-4 py-8 rounded-lg">
          <p className="font-light">{product.description}</p>
        </div>
      );
    } else if (activeTab === "additionalInfo") {
      return (
        <ul>
          <li>
            <strong>Brand:</strong>
          </li>
          <li>
            <strong>Category:</strong>
          </li>
          <li>
            <strong>Weight:</strong> kg
          </li>
          {/* Add any additional info fields here */}
        </ul>
      );
    }
  };

  return (
    <>
      <div className="flex gap-x-5">
        {/* Main Image */}
        <div className="w-[45%] flex flex-col">
          <img
            src={mainImage}
            alt={product.title}
            className="w-full h-[60vh] object-cover rounded-lg"
          />

          {/* Thumbnails */}
          <div className="flex items-center gap-x-4 h-[10vh] w-full mt-4 px-5">
            {product.images.map((image, index) => (
              <div
                key={index}
                className="relative group h-full w-full cursor-pointer rounded-xl overflow-hidden"
                onClick={() => handleImageClick(image)}
              >
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* Mask overlay */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Placeholder for additional product details */}
        <div className="w-[55%] p-8">
          <h1 className="text-4xl font-semibold pt-4">{product.name}</h1>
          <p className="font-semibold text-xl mt-3">
            Kshs. {Number(product.base_price).toLocaleString()}
          </p>
          <p className="text-green-500 py-2">
            Hurry up! Only {product.stock} products left in stock
          </p>
          <div className="flex items-center gap-x-1">
            <h4 className="text-lg mr-3">Availability:</h4>
            <p className="text-green-500 font-semibold">In Stock</p>
            <span className="text-green-500">
              <FaCheck />
            </span>
          </div>

          <div className="py-2">
            <p className="font-semibold">Color:</p>
            <div className="flex gap-x-1">
              <div className="bg-pink-500 rounded-full h-10 w-10 border-2 border-gray-300" />
              <div className="bg-blue-500 rounded-full h-10 w-10 border-2 border-gray-300" />
              <div className="bg-yellow-500 rounded-full h-10 w-10 border-2 border-gray-300" />
            </div>
          </div>

          <div className="flex flex-col">
            <p className="font-semibold mb-2">Quantity:</p>
            <div className="flex items-center gap-x-2">
              {/* Minus Button */}
              <button
                className="py-4 px-4 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200"
                onClick={handleDecrease}
              >
                <FaMinus size={12} />
              </button>

              {/* Quantity Input */}
              <input
                id="quantity"
                className="h-12 w-12 text-center rounded-lg"
                type="text"
                value={quantity}
                onChange={handleInputChange}
                onBlur={() => setQuantity((prev) => (prev === "" ? 1 : prev))}
              />

              {/* Plus Button */}
              <button
                className="py-4 px-4 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200"
                onClick={handleIncrease}
              >
                <FaPlus size={12} />
              </button>
            </div>
          </div>

          <div className="flex gap-x-4 py-4">
            <button className="hover:bg-[#021639] hover:text-white uppercase border-2 border-[#021639] rounded-lg py-3 px-6">
              Add to Cart
            </button>
            <Link to={`/product/repayment-plan/${product.id}`}>
              <button className="bg-[#021639] text-white hover:bg-[#ffd90c] hover:text-black uppercase font-semibold rounded-lg py-3 px-10">
                Buy Now
              </button>
            </Link>
          </div>

          <div className="flex items-center gap-x-1">
            <FaRegHeart size={20} />
            <p className="uppercase text-gray-600 text-lg font-semibold">
              Wishlist
            </p>
          </div>
        </div>
      </div>

      {/* Tabs for Product Description and Additional Information */}
      <div className="mt-8">
        <div className="flex gap-x-4">
          <button
            className={`py-2 px-4 border-b-2 text-xl font-semibold ${
              activeTab === "description"
                ? "border-blue-500"
                : "border-transparent"
            }`}
            onClick={() => setActiveTab("description")}
          >
            Product Description
          </button>
          <button
            className={`py-2 px-4 border-b-2 text-xl font-semibold ${
              activeTab === "additionalInfo"
                ? "border-blue-500"
                : "border-transparent"
            }`}
            onClick={() => setActiveTab("additionalInfo")}
          >
            Additional Information
          </button>
        </div>
        <div className="mt-4">{renderTabContent()}</div>
      </div>
    </>
  );
};

export default ProductItemPage;
