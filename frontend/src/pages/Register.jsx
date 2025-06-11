import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import register from "../assets/register.jpg"; // Adjust the path as necessary
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/authSlice"; // Import the registerUser action
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate and useLocation for navigation
import { mergeCart } from "../redux/slices/cartSlice"; // Import the mergeCart action

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, guestId, loading } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  //get redirect parameter and check if it checkout or smthing else
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (user) {
      if (cart?.products.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };
  return (
    <div className="flex bg-third">
      <div className="w-full md:w-1/2 md:h-[750px] h-[785px] flex flex-col justify-center items-center p-8 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-secondary p-8 rounded-lg  shadow-lg"
        >
          <div className="flex justify-center mb-4">
            <h2 className="text-lg text-main font-medium">RogueShore.</h2>
          </div>
          <h2 className="text-4xl font-bold text-center mb-6">Welcome.</h2>
          <p className="text-center mb-6 md:text-sm text-xs">
            Enter your username and password to Log in.
          </p>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-third  focus:outline-main placeholder:text-sm"
              placeholder="Enter your Name."
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-third  focus:outline-main placeholder:text-sm"
              placeholder="Enter your Email Address."
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full p-2 mb-4 border border-third  focus:outline-main placeholder:text-sm"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter your Password."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-main text-white p-2 rounded-lg font-medium hover:bg-third transition"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <p className="mt-6 text-center text-sm">
            Already Have an Account?{" "}
            <Link
              to={`/login?redirect=${encodeURIComponent(redirect)}`}
              className="text-main underline-hover"
            >
              Login.
            </Link>
          </p>
        </form>
      </div>
      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={register}
            alt="Register To Account"
            className="h-[750px] w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
