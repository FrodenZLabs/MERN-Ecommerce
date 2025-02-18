import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RepaymentPlanPage = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState();

  // State for selected repayment plan and delivery address
  const [repaymentPlan, setRepaymentPlan] = useState(3);
  const [deliveryAddress, setDeliveryAddress] = useState("");

  //   if (!product) {
  //     return <h1 className="text-4xl text-center mt-20">Product not found!</h1>;
  //   }

  // Function to proceed to checkout
  const handleProceedToCheckout = () => {
    navigate("/product/checkout/:id", {
      state: { product, repaymentPlan, deliveryAddress },
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      {/* Product Details */}
      <h2 className="text-3xl font-semibold text-center mb-6">
        Choose Repayment Plan
      </h2>
      <div className="border p-4 rounded-lg mb-4 flex gap-6">
        <img src="" alt="" className="w-24 h-24 object-cover rounded-lg" />
        <div>
          <h3 className="text-xl font-semibold">Name</h3>
          <p className="text-gray-600">Price: Kshs.</p>
          <p className="text-gray-600">Stock: 10 left</p>
        </div>
      </div>

      {/* Repayment Plan Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Select Repayment Plan</h3>
        <div className="flex flex-col gap-3">
          {[3, 6, 9, 12].map((months) => (
            <label
              key={months}
              className={`p-3 border rounded-lg cursor-pointer ${
                repaymentPlan === months ? "border-blue-500 bg-blue-100" : ""
              }`}
            >
              <input
                type="radio"
                name="repayment"
                value={months}
                checked={repaymentPlan === months}
                onChange={() => setRepaymentPlan(months)}
                className="mr-2"
              />
              {months} Months Plan
            </label>
          ))}
        </div>
      </div>

      {/* Delivery Address */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Delivery Address</h3>
        <textarea
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          className="w-full border p-3 rounded-lg"
          placeholder="Enter your delivery address..."
        />
      </div>

      {/* Proceed Button */}
      <button
        className="bg-blue-600 text-white w-full py-3 rounded-lg hover:bg-blue-700"
        onClick={handleProceedToCheckout}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default RepaymentPlanPage;
