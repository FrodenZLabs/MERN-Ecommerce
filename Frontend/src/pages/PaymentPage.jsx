import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import VisaLogo from "../assets/VisaLogo.png";
import { FcSimCardChip } from "react-icons/fc";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product, quantity, repaymentPlan, monthlyInstallment } =
    location.state || {};

  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: "",
  });

  // Function to format card number into groups of 4 digits
  const formatCardNumber = (number) => {
    return number
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  };

  // Handle input change and format the number
  const handleInputChange = (field, value) => {
    let formattedValue = value;

    if (field === "number") {
      formattedValue = formatCardNumber(value.replace(/\D/g, "").slice(0, 16)); // Keep only numbers, max 16 digits
    }

    setCardDetails((prev) => ({ ...prev, [field]: formattedValue }));
  };

  const handlePayment = (e) => {
    e.preventDefault();

    if (
      !cardDetails.number ||
      !cardDetails.name ||
      !cardDetails.expiry ||
      !cardDetails.cvc
    ) {
      toast.error("Please enter all card details.");
      return;
    }

    toast.success("Payment successful! Redirecting...");
    setTimeout(() => {
      navigate("/product/order-success");
    }, 2000);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-sm mx-auto relative z-10">
        <div className="bg-gradient-to-tr from-indigo-600 via-blue-500 to-blue-300 rounded-2xl">
          <div className="flex items-center justify-between px-7">
            <FcSimCardChip size={60} />
            <img src={VisaLogo} alt="logo" className="h-24" />
          </div>
          <div className="flex flex-col px-5 pb-5">
            <div className="text-white px-6 py-3 rounded-lg border border-white">
              <p className="text-2xl tracking-widest font-semibold">
                {cardDetails.number || "**** **** **** ****"}
              </p>
            </div>
            <div className="flex items-center justify-between mt-5">
              <p className="text-xl text-white font-semibold">
                {cardDetails.name || "Cardholder Name".toUpperCase()}
              </p>
              <div className="flex flex-col items-center">
                <p className="text-md text-white bg-blue-300 rounded-2xl px-2 py-1 font-semibold">
                  {cardDetails.expiry || "MM/YY"}
                </p>
                <div className="flex items-center gap-x-1">
                  <p className="text-sm text-blue-100">CVV:</p>
                  <p className="text-md text-gray-100 font-semibold">
                    {cardDetails.cvc || "***"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white max-w-xl mx-auto rounded-lg shadow-lg -mt-8">
        <form className="py-10 px-8">
          <div className="flex justify-between gap-x-5 mb-5">
            <div className="w-1/2">
              <label className="block text-gray-600 font-medium">
                Card Number
              </label>
              <input
                type="tel"
                name="number"
                maxLength="19" // 16 digits + 3 spaces
                value={cardDetails.number}
                onChange={(e) => handleInputChange("number", e.target.value)}
                className="w-full mt-1 p-3 border rounded-lg tracking-widest"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-600 font-medium">
                Cardholder Name
              </label>
              <input
                type="text"
                name="name"
                value={cardDetails.name}
                onChange={(e) =>
                  handleInputChange("name", e.target.value.toUpperCase())
                }
                className="w-full mt-1 p-3 border rounded-lg uppercase"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div className="flex justify-between gap-x-5">
            <div className="w-1/2">
              <label className="block text-gray-600 font-medium">
                Amount (Kshs.)
              </label>
              <input
                type="text"
                name="monthlyInstallment"
                value={monthlyInstallment}
                className="w-full mt-1 p-3 border rounded-lg text-gray-600"
                readOnly
                required
              />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-600 font-medium">
                Expiry Date
              </label>
              <input
                type="text"
                name="expiry"
                maxLength="5"
                value={cardDetails.expiry}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                  if (value.length > 4) value = value.slice(0, 4); // Restrict to 4 digits
                  if (value.length >= 3) {
                    value = value.slice(0, 2) + "/" + value.slice(2); // Add slash after MM
                  }
                  handleInputChange("expiry", value);
                }}
                className="w-full mt-1 p-3 border rounded-lg"
                placeholder="MM/YY"
                required
              />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-600 font-medium">CVC</label>
              <input
                type="text"
                name="cvc"
                maxLength="3"
                value={cardDetails.cvc}
                onChange={(e) => handleInputChange("cvc", e.target.value)}
                className="w-full mt-1 p-3 border rounded-lg"
                placeholder="123"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white w-full py-3 rounded-lg mt-6 hover:bg-green-800 text-lg font-semibold"
          >
            Make Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
