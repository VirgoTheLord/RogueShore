import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice"; // Adjust the import path as necessary

const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkout } = useSelector((state) => state.checkout);

  //clear cart when order is confirmed
  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart"); // Clear cart from local storage
    } else {
      navigate("/my-orders");
    }
  }, [checkout, dispatch, navigate]);

  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toLocaleDateString(); // Assuming delivery in 7 days
  };

  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto p-6 bg-white">
        <h1 className="text-4xl font-bold text-center text-emerald-600 mb-8">
          Thank You For Your Order!
        </h1>
        {checkout && (
          <div className="p-6 rounded-lg border border-main bg-secondary">
            <div className="flex justify-between mb-10">
              <div>
                <h2 className="text-xl font-semibold">
                  Order ID: {checkout._id}
                </h2>
                <p className="text-gray-500">
                  Order Date:{" "}
                  {new Date(checkout.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right self-end">
                {" "}
                {/* Ensured right alignment */}
                <p className="text-emerald-600 text-sm -mt-26 md:-mt-13">
                  Estimated Delivery:{" "}
                  {calculateEstimatedDelivery(checkout.createdAt)}
                </p>
              </div>
            </div>

            {/* CheckoutItems Section */}
            {checkout.checkoutItems && checkout.checkoutItems.length > 0 ? (
              <div className="mb-20">
                {checkout.checkoutItems.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center mb-2 sm:mb-4"
                  >
                    {" "}
                    {/* Scaled margin */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md mr-2 sm:mr-4" // Scaled image and margin
                    />
                    <div>
                      <h4 className="text-sm sm:text-md font-semibold">
                        {item.name}
                      </h4>{" "}
                      {/* Scaled font */}
                      <p className="text-xs sm:text-sm text-gray-500">
                        {" "}
                        {/* Scaled font */}
                        {item.color} | {item.size}
                      </p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-sm sm:text-md">${item.price}</p>{" "}
                      {/* Scaled font */}
                      <p className="text-xs sm:text-sm text-gray-500">
                        {" "}
                        {/* Scaled font */}
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No items in this order.</p>
            )}

            {/* Payment and Delivery Section - Unchanged */}
            <div className="grid grid-cols-2 gap-8 mt-8">
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
                  {checkout.shippingAddress.city}, ,
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
