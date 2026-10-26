import React from "react";
import { useCart } from "../context/CartContext";

function Summary() {
  const { cart } = useCart();

  const total = cart.reduce((sum, product) => {
    return sum + product.price * product.quantity;
  }, 0);

  return (
    <div className="rounded-md border p-5">
      <h2 className="mb-4 text-xl font-bold">
        Order Summary
      </h2>

      <div className="flex justify-between border-t pt-4">
        <span className="font-semibold">
          Total
        </span>

        <span className="text-xl font-bold">
          ${total.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

export default Summary;
