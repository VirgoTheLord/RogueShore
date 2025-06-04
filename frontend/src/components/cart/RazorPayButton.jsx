import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
      key: "rzp_test_6WERBjWFZCPdNL", // Replace with your Razorpay Test Key ID
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
      className="w-full bg-black text-white py-3 rounded"
    >
      Pay with Razorpay
    </button>
  );
};

export default RazorPayButton;
