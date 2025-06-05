import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const mockOrderDetails = {
      _id: id,
      createdAt: new Date(),
      isPaid: true,
      isDelivered: false,
      paymentMethod: "RazorPay",
      shippingMethod: "Standard",
      shippingAddress: { city: "New York", country: "USA" },
      orderItems: [
        {
          productId: "1",
          name: "Jacket",
          price: 120,
          quantity: 1,
          image: "https://picsum.photos/150?random=1",
        },
        {
          productId: "2",
          name: "T-Shirt",
          price: 150,
          quantity: 2,
          image: "https://picsum.photos/150?random=2",
        },
      ],
    };
    setOrderDetails(mockOrderDetails);
  }, [id]);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
          Order Details
        </h2>
        {!orderDetails ? (
          <p>No Order Details Found.</p>
        ) : (
          <div className="p-4 sm:p-6 rounded-lg border bg-secondary border-main">
            <div className="flex flex-col sm:flex-row justify-between mb-6 sm:mb-8">
              <div>
                <h3 className="text-md sm:text-lg md:text-xl font-semibold">
                  Order ID: #{orderDetails._id}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {new Date(orderDetails.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
                <span
                  className={`${
                    orderDetails.isPaid
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  } px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-2`}
                >
                  {orderDetails.isPaid ? "Approved" : "Pending"}
                </span>
                <span
                  className={`${
                    orderDetails.isDelivered
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  } px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-2`}
                >
                  {orderDetails.isDelivered ? "Delivered" : "Pending"}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 mb-6 sm:mb-8">
              <div>
                <div className="text-md sm:text-lg font-semibold mb-2">
                  Payment Info
                </div>
                <p className="text-sm sm:text-base">
                  Payment Method: {orderDetails.paymentMethod}
                </p>
                <p className="text-sm sm:text-base">
                  Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}
                </p>
              </div>
              <div>
                <div className="text-md sm:text-lg font-semibold mb-2">
                  Shipping Info
                </div>
                <p className="text-sm sm:text-base">
                  Shipping Method: {orderDetails.shippingMethod}
                </p>
                <p className="text-sm sm:text-base">
                  Address:{" "}
                  {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`}
                </p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <h4 className="text-md sm:text-lg font-semibold mb-2 sm:mb-4">
                Order Items
              </h4>
              <table className="min-w-full bg-white text-gray-600 mb-4 rounded-lg">
                <thead className="bg-third rounded-2xl">
                  <tr>
                    <th className="py-2 px-2 sm:px-4 text-left text-xs sm:text-sm font-semibold">
                      Name
                    </th>
                    <th className="py-2 px-2 sm:px-4 text-left text-xs sm:text-sm font-semibold">
                      Unit Price
                    </th>
                    <th className="py-2 px-2 sm:px-4 text-left text-xs sm:text-sm font-semibold">
                      Quantity
                    </th>
                    <th className="py-2 px-2 sm:px-4 text-left text-xs sm:text-sm font-semibold">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="rounded-lg">
                  {orderDetails.orderItems.map((item) => (
                    <tr key={item.productId} className="border-b border-main">
                      <td className="py-2 px-2 sm:px-4 flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg mr-2 sm:mr-4"
                        />
                        <Link
                          to={`/product/${item.productId}`}
                          className="text-main underline-hover text-xs sm:text-base"
                        >
                          {item.name}
                        </Link>
                      </td>
                      <td className="py-2 px-2 sm:px-4 text-xs sm:text-base">
                        ${item.price}
                      </td>
                      <td className="py-2 px-2 sm:px-4 text-xs sm:text-base">
                        {item.quantity}
                      </td>
                      <td className="py-2 px-2 sm:px-4 text-xs sm:text-base">
                        ${item.price * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link
              to="/my-orders"
              className="text-main underline-hover text-sm sm:text-base"
            >
              Back to My Orders.
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsPage;
