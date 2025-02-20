import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { fetchProducts } from "../../redux/services/authService";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const latestProducts = await fetchProducts({
        sortOrder: "createdAt_desc",
        limit: 6,
      });
      setProducts(latestProducts);
      setLoading(false);
    };

    loadProducts();
  }, []);

  return (
    <div>
      {/* User Overview */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold">Welcome,</h2>
        <p className="text-gray-600 mt-2">
          Your Credit Score: <span className="font-bold">720</span>
        </p>
        <p className="text-gray-600">
          Risk Level: <span className="font-bold text-green-500">Low</span>
        </p>
      </div>

      {/* Tech Products with Dynamic Pricing */}
      <h3 className="text-xl font-semibold mt-6">Recent Tech Products</h3>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {products.length > 0 ? (
            products.map((item) => <ProductCard key={item._id} item={item} />)
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
