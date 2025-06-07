const express = require("express");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const { protect } = require("../middleware/authMiddleware");

const cartRouter = express.Router();

//HELPER FUNCTION TO GET CART BY USER OR GUEST ID
const getCart = async (userId, guestId) => {
  if (userId) {
    //if user is logged in, find cart by userId
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId: guestId });
  }
};

// POST /api/cart
// add items to cart for guest or logged user
cartRouter.post("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    //check is user is logged in or guest
    let cart = await getCart(userId, guestId);

    //if the cart exists update it
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );
      if (productIndex > -1) {
        //if product already exists in cart, update quantity
        cart.products[productIndex].quantity += Number(quantity);
      } else {
        //add new product to cart
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          size,
          color,
          quantity,
        });
      }

      //recalculate total price
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + Number(item.price) * Number(item.quantity),
        0
      );

      await cart.save();
      return res.status(200).json(cart);
    } else {
      //create a new cart for guest or logged user
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * Number(quantity),
      });
      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

//PUT /api/cart
// update cart items for guest or logged user
//public access

cartRouter.put("/", protect, async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (productIndex > -1) {
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1); //remove product if quantity is 0
      }
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + Number(item.price) * Number(item.quantity),
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

//DELETE /api/cart
//remove product from cart
//public access
cartRouter.delete("/", protect, async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );
    if (productIndex > -1) {
      cart.products.splice(productIndex, 1); //remove product from cart
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + Number(item.price) * Number(item.quantity),
        0
      );
      await cart.save();
      res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

//GET /api/cart
//GET loged user or guest cart
//public access

cartRouter.get("/", protect, async (req, res) => {
  const { userId, guestId } = req.query;
  try {
    const cart = await getCart(userId, guestId);
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//POST /api/cart/merge
//merge guest cart with user cart on login
//access private

cartRouter.post("/merge", protect, async (req, res) => {
  const { guestId } = req.body;

  try {
    const guestCart = await Cart.findOne({ guestId: guestId });
    const userCart = await Cart.findOne({ user: req.user._id });
    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(400).json({ message: "Guest cart is empty" });
      }
      if (userCart) {
        guestCart.products.forEach((guestItem) => {
          const productIndex = userCart.products.findIndex((item) => {
            item.productId.toString() === guestItem.productId.toString() &&
              item.size === guestItem.size &&
              item.color === guestItem.color;
          });

          if (productIndex > -1) {
            userCart.products[productIndex].quantity += guestItem.quantity; //update quantity if product already exists
          } else {
            //otherwise add guest item to cart
            userCart.products.push(guestItem);
          }
        });
        userCart.totalPrice = userCart.products.reduce(
          (acc, item) => acc + Number(item.price) * Number(item.quantity),
          0
        );
        await userCart.save();

        //remove the guest cart after merging
        try {
          await Cart.findOneAndDelete({ guestId });
        } catch (error) {
          console.error("Error deleting guest cart after merging: ", error);
        }
        res.status(200).json(userCart);
      } else {
        //if user cart does not exist, cassign guest cart to user
        guestCart.user = req.user._id;
        guestCart.guestId = undefined; //remove guestId
        await guestCart.save();
        res.status(200).json(guestCart);
      }
    } else {
      if (userCart) {
        //guestCart has been merged return user cart
        res.status(200).json(userCart);
      }
      res.status(404).json({ message: "Guest cart not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = cartRouter;
