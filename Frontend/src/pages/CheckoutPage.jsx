import { useLocation, useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product, quantity, repaymentPlan, deliveryAddress } =
    location.state || {};

  const handleProceedToConfirmation = () => {
    navigate("/product/order-success");
  };
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg my-7">
      <h2 className="text-3xl font-semibold text-center mb-6">Checkout</h2>

      {/* Product Details */}
      <div className="border p-4 rounded-lg mb-4 flex gap-6">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-24 h-24 object-cover rounded-lg"
        />
        <div>
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-900">
            Price: Kshs. {Number(product.base_price).toLocaleString()}
          </p>
          <p className="text-gray-900">Quantity: {quantity}</p>
          <p className="text-gray-900">Selected Plan: {repaymentPlan} months</p>
        </div>
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
