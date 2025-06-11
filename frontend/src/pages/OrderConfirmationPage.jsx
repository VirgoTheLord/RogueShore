import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice"; // Adjust the import path as necessary

const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkout } = useSelector((state) => state.checkout);

  // Clear cart when order is confirmed
  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart");
    } else {
      navigate("/my-orders");
    }
  }, [checkout, dispatch, navigate]);

  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toLocaleDateString();
  };

  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto p-6 bg-white">
        <h1 className="text-4xl font-bold text-center text-emerald-600 mb-8">
          Thank You For Your Order!
        </h1>

        {checkout && (
          <div className="p-6 rounded-lg border border-main bg-secondary">
            {/* Order Summary */}
            <div className="mb-10">
              <div className="flex flex-col md:flex-row md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    Order ID: {checkout._id}
                  </h2>
                  <p className="text-gray-500">
                    Order Date:{" "}
                    {new Date(checkout.createdAt).toLocaleDateString()}
                  </p>

                  {/* Estimated Delivery for Mobile */}
                  <p className="text-emerald-600 text-sm mt-2 md:hidden">
                    Estimated Delivery:{" "}
                    {calculateEstimatedDelivery(checkout.createdAt)}
                  </p>
                </div>

                {/* Estimated Delivery for Desktop */}
                <div className="hidden md:block text-right self-end">
                  <p className="text-emerald-600 text-sm">
                    Estimated Delivery:{" "}
                    {calculateEstimatedDelivery(checkout.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Checkout Items */}
            {checkout.checkoutItems && checkout.checkoutItems.length > 0 ? (
              <div className="mb-20">
                {checkout.checkoutItems.map((item) => (
                  <div key={item.productId} className="flex items-center mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md mr-4"
                    />
                    <div>
                      <h4 className="text-sm sm:text-md font-semibold">
                        {item.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {item.color} | {item.size}
                      </p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-sm sm:text-md">${item.price}</p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No items in this order.</p>
            )}

            {/* Payment & Delivery Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
              <div>
                <h4 className="text-lg font-semibold mb-2">Payment:</h4>
                <p className="text-gray-600">RazorPay</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Delivery</h4>
                <p className="text-gray-600">
                  {checkout.shippingAddress.address}
                </p>
                <p className="text-gray-600">
                  {checkout.shippingAddress.city},{" "}
                  {checkout.shippingAddress.country}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
