import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Summary from "../components/Summry";

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  return (
    <div className="mx-auto max-w-3xl p-3 md:p-6">
      <div className="mb-4 text-3xl font-bold">Cart</div>

      {cart.length === 0 ? (
        <div className="py-10 text-center">
          <p className="mb-4 text-gray-500">Your cart is empty.</p>

          <Link to="/" className="rounded-md bg-black px-4 py-2 text-amber-50">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col">
            <Link
              to="/"
              className="rounded-md ring px-3 py-2 block w-45 text-center mb-4 hover:text-amber-50 hover:bg-black"
            >
              ← Continue Shopping
            </Link>
            {cart.map((product) => (
              <div
                key={product.id}
                className="mb-2.5 flex w-full items-center gap-4 rounded-md border p-4"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-17 w-17 object-contain md:h-34 md:w-34"
                />

                <div className="flex flex-1 flex-col">
                  <h2 className="text-md">{product.title}</h2>

                  <p className="text-sm text-gray-600">
                    ${product.price.toFixed(2)} each
                  </p>
                  <p className="text-md font-bold">
                    ${(product.price * product.quantity).toFixed(2)}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor={`quantity-${product.id}`}
                      className="sr-only"
                    >
                      Quantity for {product.title}
                    </label>
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${product.title}`}
                      onClick={() =>
                        updateQuantity(product.id, product.quantity - 1)
                      }
                      disabled={product.quantity <= 1}
                      className="h-8 w-8 rounded border disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      −
                    </button>
                    <input
                      id={`quantity-${product.id}`}
                      type="number"
                      min="1"
                      step="1"
                      value={product.quantity}
                      onChange={(event) => {
                        const value = event.target.value;
                        if (value === "") return;
                        updateQuantity(
                          product.id,
                          Math.max(1, Number(value) || 1),
                        );
                      }}
                      className="w-16 rounded border px-2 py-1 text-center"
                    />
                    <button
                      type="button"
                      aria-label={`Increase quantity of ${product.title}`}
                      onClick={() =>
                        updateQuantity(product.id, product.quantity + 1)
                      }
                      className="h-8 w-8 rounded border"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="w-full rounded-md px-2 py-1 text-xs text-red-500 ring ring-red-500 hover:bg-red-500 hover:text-amber-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Summary />
          <Link
            to="/checkout"
            className="mx-auto mt-5 block w-fit bg-black px-5 py-2 text-amber-50 rounded-md"
          >
            Proceed to Checkout
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;
