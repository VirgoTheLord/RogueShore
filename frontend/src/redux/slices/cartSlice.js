import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//helper function to load cart from local storage
const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : { products: [] };
};

//helper function to save cart to local storage
const saveCartToStorage = (cart) => {
  localStorages.setItem("cart", JSON.stringify(cart));
};
