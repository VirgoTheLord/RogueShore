import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RazorpayButton from "./RazorPayButton";

const cart = {
  products: [
    {
      name: "Stylish Jacket",
      size: "M",
      color: "Black",
      price: 120,
      image: "https://picsum.photos/150?random=1",
    },
    {
      name: "Casual Sneakers",
      size: "42",
      color: "White",
      price: 75,
      image: "https://picsum.photos/150?random=2",
    },
  ],
  totalPrice: 195,
};

const Checkout = () => {
  const navigate = useNavigate();
  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const handleCreateCheckout = (e) => {
    e.preventDefault();
    setCheckoutId(123); // Mock checkout ID for client-side flow
  };

  const handlePaymentSuccess = (details) => {
    console.log("Payment Successful:", details);
    navigate("/order-confirmation");
  };

  const handlePaymentError = (error) => {
    alert("Payment Failed: " + error);
  };

  return (
    <div className="bg-third">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-4xl font-semibold uppercase mb-6 underline-hover">
            Checkout.
          </h2>
          <form onSubmit={handleCreateCheckout}>
            <h3 className="text-lg text-gray-800 font-semibold mb-4">
              Contact Details.
            </h3>
            <div className="mb-4">
              <label className="block text-gray-600">Email</label>
              <input
                type="email"
                value="example@gmail.com"
                className="w-full p-2 border border-main text-gray-400 rounded"
                disabled
              />
            </div>
            <h3 className="text-lg text-gray-800 font-semibold mb-4">
              Delivery.
            </h3>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600">First Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-main text-gray-500 focus:outline-main rounded"
                  required
                  value={shippingAddress.firstName}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      firstName: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-600">Last Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-main text-gray-500 focus:outline-main rounded"
                  required
                  value={shippingAddress.lastName}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      lastName: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">Address</label>
              <input
                type="text"
                value={shippingAddress.address}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    address: e.target.value,
                  })
                }
                className="w-full p-2 border border-main text-gray-500 focus:outline-main rounded"
                required
              />
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600">City</label>
                <input
                  type="text"
                  className="w-full p-2 border border-main text-gray-500 focus:outline-main rounded"
                  required
                  value={shippingAddress.city}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      city: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-600">Postal Code</label>
                <input
                  type="text"
                  className="w-full p-2 border border-main text-gray-500 focus:outline-main rounded"
                  required
                  value={shippingAddress.postalCode}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      postalCode: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">Country</label>
              <input
                type="text"
                value={shippingAddress.country}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    country: e.target.value,
                  })
                }
                className="w-full p-2 border border-main text-gray-500 focus:outline-main rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">Phone Number</label>
              <input
                type="text"
                value={shippingAddress.phone}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    phone: e.target.value,
                  })
                }
                className="w-full p-2 border border-main text-gray-500 focus:outline-main rounded"
                required
              />
            </div>
            <div className="mt-6">
              {!checkoutId ? (
                <button
                  type="submit"
                  className="w-full bg-main text-white hover:bg-third py-3 rounded"
                >
                  Continue to Payment
                </button>
              ) : (
                <div>
                  <h3 className="text-md font-medium mb-4">
                    Pay with Razorpay.
                  </h3>
                  <RazorpayButton
                    amount={cart.totalPrice}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                    shippingAddress={shippingAddress}
                  />
                </div>
              )}
            </div>
          </form>
        </div>

        <div className="bg-secondary p-6 rounded-lg">
          <h3 className="text-4xl font-semibold underline-hover mb-7">
            Order Summary.
          </h3>
          <div className="mb-4">
            {cart.products.map((product, index) => (
              <div
                key={index}
                className="flex items-start justify-between py-2 border-b border-main"
              >
                <div className="flex items-start">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-17 object-cover mr-4"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-md text-gray-800">{product.name}</h3>
                    <p className="text-gray-500">Size: {product.size}</p>{" "}
                    <p className="text-gray-500">Color: {product.color}</p>{" "}
                  </div>
                </div>
                <p className="text-xl">${product.price?.toLocaleString()}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center text-lg mb-4">
            <p>SubTotal:</p>
            <p>${cart.totalPrice}</p>
          </div>
          <div className="flex justify-between items-center text-lg">
            <p>Shipping:</p>
            <p>Free</p>
          </div>
          <div className="flex justify-between items-center text-lg mt-4 border-t border-main pt-4">
            <p>Total:</p>
            <p>${cart.totalPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
