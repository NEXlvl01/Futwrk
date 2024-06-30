import React, { useState, useEffect } from "react";
import CartItemDiv from "./CartItemDiv";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

export default function CartItems({
  cartItems,
  setCartItems,
  setCartCount,
  cartCount,
  setTotalOrderCost
}) {
  const [totalCost, setTotalCost] = useState(0);
  const navigate = useNavigate();

  const calculateTotalCost = () => {
    let total = 0;
    let totalItems = 0;
    cartItems.forEach((item) => {
      total += item.quantity * item.price;
      totalItems += item.quantity;
    });
    setTotalCost(total);
    setCartCount(totalItems);
  };

  useEffect(() => {
    calculateTotalCost();
  }, [cartItems]);

  const updateCartItemQuantity = (index, newQuantity) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = newQuantity;
    setCartItems(updatedCartItems);
  };

  const removeCartItem = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  };

  return (
    <div id="cartTwoColumns" className="flex gap-7">
      {/* Cart items */}
      <div id="cartColumn1" className="w-[70%] flex flex-col">
        {/* Cart items header */}
        <div
          id="productHeading"
          className="w-[100%] h-[70px] px-3 flex items-center text-neutral-400 bg-neutral-800 font-semibold"
        >
          <div className="w-[40%] flex justify-center">Product</div>
          <div className="w-[20%] flex justify-center">Price</div>
          <div className="w-[20%] flex justify-center">Quantity</div>
          <div className="w-[20%] flex justify-center">Size</div>
          <div className="w-[20%] flex justify-center">Subtotal</div>
        </div>

        {/* Cart items list */}
        {cartItems.map((cart, index) => (
          <CartItemDiv
            key={index}
            index={index}
            image={cart.image}
            title={cart.title}
            quantity={cart.quantity}
            size={cart.size}
            price={cart.price}
            onUpdateQuantity={(newQuantity) =>
              updateCartItemQuantity(index, newQuantity)
            }
            onRemove={removeCartItem}
            setCartCount={setCartCount}
            cartCount={cartCount}
          />
        ))}
      </div>

      {/* Cart totals */}
      <div id="cartColumn2" className="w-[30%]">
        <h1 className="text-white bg-neutral-800 h-[70px] flex items-center justify-center text-xl font-semibold">
          Cart Totals
        </h1>
        <div className="p-5 flex flex-col gap-9 border border-neutral-600">
          {/* Subtotal */}
          <div className="flex flex-col gap-4">
            <div
              id="subTotalDiv"
              className="text-neutral-400 flex gap-20 text-lg"
            >
              <p className="w-[20%]">Subtotal</p>
              <p>{totalCost}</p>
            </div>
            <div className="w-[100%] h-[1px] bg-neutral-600"></div>
            {/* Total */}
            <div
              id="subTotalDiv"
              className="text-neutral-400 flex gap-20 text-lg"
            >
              <p className="w-[20%]">Total</p>
              <p>{totalCost}</p>
            </div>
            <div className="w-[100%] h-[1px] bg-neutral-600"></div>
          </div>
          {/* Proceed to checkout button */}
          <div>
            <button
              onClick={() => {
                navigate("/checkout");
                setTotalOrderCost(totalCost);
                document.documentElement.scrollTop = 0;
              }}
              className="w-[100%] h-[110px] bg-[#cd9940] font-medium border hover:bg-neutral-700 text-white text-xl px-4"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
