import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [product, setProduct] = useState();
  const [repaymentPlan, setRepaymentPlan] = useState();
  const [deliveryAddress, setDeliveryAddress] = useState();
  const navigate = useNavigate();

  //   if (!product) {
  //     return <h1 className="text-4xl text-center mt-20">Product not found!</h1>;
  //   }

  // Dynamic pricing logic
  //   const basePrice = parseFloat(product.base_price);
  //   const interestRate = 0.05; // 5% per month interest
  //   const totalPrice = basePrice * (1 + interestRate * repaymentPlan);
  //   const monthlyInstallment = totalPrice / repaymentPlan;

  const handleProceedToConfirmation = () => {
    navigate("/product/order-success");
  };
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-semibold text-center mb-6">Checkout</h2>

      {/* Product Details */}
      <div className="border p-4 rounded-lg mb-4">
        <h3 className="text-xl font-semibold">Name</h3>
        <p className="text-gray-600">Kshs. </p>
        <p className="text-gray-600">Selected Plan: months</p>
      </div>

      {/* Pricing Breakdown */}
      <div className="border p-4 rounded-lg mb-4">
        <h3 className="text-lg font-semibold">Pricing Breakdown</h3>
        <p>
          Total Price: <strong>Kshs. </strong>
        </p>
        <p>
          Monthly Installment: <strong>Kshs. </strong>
        </p>
      </div>

      {/* Delivery Address */}
      <div className="border p-4 rounded-lg">
        <h3 className="text-lg font-semibold">Delivery Address</h3>
        <p className="text-gray-600">{deliveryAddress}</p>
      </div>

      {/* Confirm Purchase Button */}
      <button
        onClick={handleProceedToConfirmation}
        className="bg-green-600 text-white w-full py-3 rounded-lg mt-6 hover:bg-green-700"
      >
        Confirm Purchase
      </button>
    </div>
  );
};

export default CheckoutPage;
