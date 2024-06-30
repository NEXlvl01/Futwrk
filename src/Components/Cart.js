import React from "react";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CartItems from "./CartItems";
import "./Cart.css";

export default function Cart({ cartCount,setCartCount,cartItems,setCartItems,setTotalOrderCost }) {
  const navigate = useNavigate();


  return (
    <div className="flex justify-center py-14 bg-neutral-800">
      <div id = "mainCartDiv" className="w-[75%] bg-[#111111] p-14 flex flex-col gap-10">
        <h1 className="text-[#f6aa28] text-5xl font-semibold text-center">
          CART
        </h1>
        <div>
          {cartCount === 0 ? (
            <div className="flex flex-col gap-7">
            <Alert severity="info">Your cart is currently empty.</Alert>
            <button className="text-white w-[200px] h-[50px] bg-[#cd9940] px-4 font-medium border hover:bg-neutral-700" onClick={() => {navigate("/collection")}}>RETURN TO SHOP</button>
            </div>
          ) : (
            <CartItems cartItems = {cartItems} setCartItems = {setCartItems} setCartCount = {setCartCount} cartCount = {cartCount} setTotalOrderCost = {setTotalOrderCost}/>
          )}

          
        </div>
      </div>
    </div>
  );
}
