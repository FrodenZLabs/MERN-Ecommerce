import { useState } from "react";
import { data } from "../constants/data";
import ProductCard from "../components/ProductCard";

const ProductPage = () => {
  const [selectedAvailability, setSelectedAvailability] = useState({
    inStock: false,
    outOfStock: false,
  });
  const [selectedType, setSelectedType] = useState({
    laptop: false,
    notebook: false,
    phone: false,
    speaker: false,
  });

  // Handle change of checkbox state for availability
  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setSelectedAvailability((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  // Handle change of checkbox state for product type
  const handleTypeChange = (e) => {
    const { id, checked } = e.target;
    setSelectedType((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  // Reset availability checkboxes
  const resetAvailability = (e) => {
    e.preventDefault(); // Prevent default action to avoid page refresh
    setSelectedAvailability({
      inStock: false,
      outOfStock: false,
    });
  };

  // Reset product type checkboxes
  const resetTypes = (e) => {
    e.preventDefault(); // Prevent default action to avoid page refresh
    setSelectedType({
      laptop: false,
      notebook: false,
      phone: false,
      speaker: false,
    });
  };

  // Count the number of selected checkboxes for availability
  const selectedAvailabilityCount =
    Object.values(selectedAvailability).filter(Boolean).length;
  // Count the number of selected checkboxes for product type
  const selectedTypeCount = Object.values(selectedType).filter(Boolean).length;

  return (
    <>
      <div>
        <div className="w-full bg-gray-100 border-b border-gray-600 pb-4">
          <form className="flex justify-between gap-y-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                id="searchTerm"
                placeholder="Search..."
                className="border rounded-lg p-2 w-full"
              />
            </div>

            {/* Availability section */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="font-semibold">Availability:</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={selectedAvailability.inStock}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4"
                />
                <label htmlFor="inStock">In Stock</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="outOfStock"
                  checked={selectedAvailability.outOfStock}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4"
                />
                <label htmlFor="outOfStock">Out of Stock</label>
              </div>
              <div className="flex gap-x-2">
                <span className="text-sm text-gray-500">
                  {selectedAvailabilityCount}{" "}
                  {selectedAvailabilityCount === 1 ? "item" : "items"} selected
                </span>
                <button
                  onClick={resetAvailability}
                  className="text-gray-400 underline text-sm"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Product Type section */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="font-semibold">Product Type:</label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="laptop"
                    checked={selectedType.laptop}
                    onChange={handleTypeChange}
                    className="w-4 h-4"
                  />
                  <label htmlFor="laptop">Laptop</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="notebook"
                    checked={selectedType.notebook}
                    onChange={handleTypeChange}
                    className="w-4 h-4"
                  />
                  <label htmlFor="notebook">Notebook</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="phone"
                    checked={selectedType.phone}
                    onChange={handleTypeChange}
                    className="w-4 h-4"
                  />
                  <label htmlFor="phone">Phone</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="speaker"
                    checked={selectedType.speaker}
                    onChange={handleTypeChange}
                    className="w-4 h-4"
                  />
                  <label htmlFor="speaker">Speaker</label>
                </div>
              </div>
              <div className="flex gap-x-2">
                <span className="text-sm text-gray-500">
                  {selectedTypeCount}{" "}
                  {selectedTypeCount === 1 ? "item" : "items"} selected
                </span>
                <button
                  onClick={resetTypes}
                  className="text-gray-400 underline text-sm"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Sort and Search button */}
            <div className="flex flex-col items-center gap-2">
              <div className="flec flex-col items-center gap-2">
                <label className="font-semibold mr-1">Sort:</label>
                <select
                  defaultValue={"created_at_desc"}
                  id="sort_order"
                  className="border rounded-lg p-2"
                >
                  <option value="regularPrice_desc">Price high to low</option>
                  <option value="regularPrice_asc">Price low to high</option>
                  <option value="createdAt_desc">Latest</option>
                  <option value="createdAt_asc">Oldest</option>
                </select>
              </div>
              <button className="bg-slate-700 text-white py-2 px-4 rounded-lg uppercase hover:opacity-90">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <h3 className="text-xl font-semibold mt-6">Available Tech Products</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {/* Map through products and display ProductCard */}
        {data.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
};

export default ProductPage;
