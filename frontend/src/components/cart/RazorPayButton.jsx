import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCreditCard } from "react-icons/fa"; // CHANGED: Imported react-icons/fa for credit card icon

const RazorPayButton = ({ amount, onSuccess, onError, shippingAddress }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Load Razorpay checkout script dynamically
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {
    // Convert amount to paise (Razorpay expects smallest currency unit)
    const amountInPaise = amount * 100 * 86;

    // Razorpay checkout options
    const options = {
      key: import.meta.env.VITE_KEY_ID, // Replace with your Razorpay Test Key ID
      amount: amountInPaise, // Amount in paise (e.g., 10000 for ₹100)
      currency: "INR",
      name: "RogueShore",
      description: "Your Cart Items:",
      image: "./Logo.jpg", // Optional: Add your logo URL
      handler: function (response) {
        // Handle successful payment
        onSuccess({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        });
      },
      prefill: {
        name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
        email: "example@gmail.com", // Use dynamic email if available
        contact: shippingAddress.phone,
      },
      notes: {
        address: `${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}`,
      },
      theme: {
        color: "#000000", // Customize to match your brand
      },
      modal: {
        ondismiss: function () {
          onError("Payment was dismissed by the user.");
        },
      },
    };

    // Initialize Razorpay checkout
    try {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      onError("Failed to initialize Razorpay: " + error.message);
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="relative w-full inline-flex items-center justify-center text-md font-medium text-white bg-gradient-to-r from-[#08153e] to-[#1aa6c8] px-6 py-3 rounded-lg overflow-hidden hover:animate-color-pulse active:scale-95 group" // CHANGED: Added PayPal-inspired hover:shadow-lg, hover:animate-color-pulse, active:scale-95, group
    >
      <span className="relative z-10 flex items-center">
        Pay with Razorpay
        <FaCreditCard className="ml-2 w-5 h-5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />{" "}
        {/* CHANGED: Used FaCreditCard with hover animation */}
      </span>
      <span className="absolute inset-0 bg-blue-50 rounded-lg animate-ripple opacity-30 z-0"></span>{" "}
      {/* CHANGED: Unchanged, kept ripple effect */}
    </button>
  );
};

export default RazorPayButton;
