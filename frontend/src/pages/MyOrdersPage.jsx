import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const mockOrders = [
        {
          _id: "1234",
          createdAt: new Date(),
          shippingAddress: { city: "New York", country: "USA" },
          orderItems: [
            {
              name: "Product 1",
              image: "https://picsum.photos/500/500?random=1",
            },
          ],
          totalPrice: 100,
          isPaid: true,
        },
        {
          _id: "2345",
          createdAt: new Date(),
          shippingAddress: { city: "New York", country: "USA" },
          orderItems: [
            {
              name: "Product 2",
              image: "https://picsum.photos/500/500?random=2",
            },
          ],
          totalPrice: 120,
          isPaid: false,
        },
      ];
      setOrders(mockOrders);
    }, 1000);
  }, []);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <h2 className="text-xl sm:text-4xl font-bold mb-6">My Orders</h2>

        {/* Responsive card grid (shown on <lg screens) */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:hidden">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order._id}
                onClick={() => handleRowClick(order._id)}
                className="border border-third rounded-lg p-4 bg-secondary shadow-md"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={order.orderItems[0].image}
                    alt={order.orderItems[0].name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <p className="text-sm text-main underline-hover">
                      #{order._id}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}{" "}
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <div className="text-sm space-y-1">
                  <p>
                    <span className="font-medium text-gray-500">Shipping:</span>{" "}
                    {order.shippingAddress
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : "N/A"}
                  </p>
                  <p>
                    <span className="font-medium text-gray-500">Items:</span>{" "}
                    {order.orderItems.length}
                  </p>
                  <p>
                    <span className="font-medium text-gray-500">Total:</span> $
                    {order.totalPrice}
                  </p>
                  <p>
                    <span className="font-medium text-gray-500">Status:</span>{" "}
                    <span
                      className={`${
                        order.isPaid
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      } px-2 py-1 rounded-full text-xs font-semibold`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              You Have No Orders.
            </p>
          )}
        </div>

        {/* Table view only on large screens */}
        <div className="hidden lg:block relative shadow-md sm:rounded-lg overflow-hidden bg-secondary border border-third mt-6">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-gray-500">
              <thead className="bg-main text-xs uppercase text-white">
                <tr>
                  <th className="py-2 px-4">Image</th>
                  <th className="py-2 px-4">OrderId</th>
                  <th className="py-2 px-4">Created</th>
                  <th className="py-2 px-4">Shipping Address</th>
                  <th className="py-2 px-4">Items</th>
                  <th className="py-2 px-4">Price</th>
                  <th className="py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr
                      key={order._id}
                      onClick={() => handleRowClick(order._id)}
                      className="border-b border-main hover:border-third cursor-pointer"
                    >
                      <td className="py-4 px-4">
                        <img
                          src={order.orderItems[0].image}
                          alt={order.orderItems[0].name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      </td>
                      <td className="my-7 px-4 font-medium text-main underline-hover">
                        #{order._id}
                      </td>
                      <td className="py-4 px-4">
                        {new Date(order.createdAt).toLocaleDateString()}{" "}
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </td>
                      <td className="py-4 px-4">
                        {order.shippingAddress
                          ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                          : "N/A"}
                      </td>
                      <td className="py-4 px-4">{order.orderItems.length}</td>
                      <td className="py-4 px-4">${order.totalPrice}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`${
                            order.isPaid
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          } px-2 py-1 rounded-full text-xs sm:text-sm font-medium`}
                        >
                          {order.isPaid ? "Paid" : "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-4 px-4 text-center text-gray-500"
                    >
                      You Have No Orders.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrdersPage;
