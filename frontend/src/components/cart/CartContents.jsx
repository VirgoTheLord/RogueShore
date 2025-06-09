import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../redux/slices/cartSlice";

const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();
  //handle adding or removing items from the cart
  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        })
      );
    }
  };
  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({ productId, guestId, userId, size, color }));
  };

  return (
    <div>
      {cart.products.map((item, index) => {
        return (
          <div
            key={index}
            className="flex items-start justify-between py-4 border-b border-gray-200"
          >
            <div className="flex items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-22 object-cover mr-4 rounded-lg"
              />
              <div>
                <h3>{item.name}</h3>
                <p className="text-sm text-gray-500">
                  Size:{item.size} | Color:{item.color}
                </p>
                <div className="flex items-center mt-2 ">
                  <button
                    className="border border-gray-500 rounded px-2 py-0.5 text-xl font-medium"
                    onClick={() =>
                      handleAddToCart(
                        item.productId,
                        -1,
                        item.quantity,
                        item.size,
                        item.color
                      )
                    }
                  >
                    -
                  </button>
                  <span className="mx-3">{item.quantity}</span>
                  <button
                    className="border border-gray-500 rounded px-2 py-0.5 text-xl font-medium"
                    onClick={() =>
                      handleAddToCart(
                        item.productId,
                        1,
                        item.quantity,
                        item.size,
                        item.color
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div>
              <p>$ {item.price.toLocaleString()}</p>
              <button
                onClick={() =>
                  handleRemoveFromCart(item.productId, item.size, item.color)
                }
              >
                <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartContents;
