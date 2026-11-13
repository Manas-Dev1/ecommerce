import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useCart } from "../context/CartContext";
import Popup from "../components/Popup";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: product,
    error,
    loading,
  } = useFetch(`https://fakestoreapi.com/products/${id}`);

  const {
    addToCart,
    cart,
    cartPrompt,
    cancelCartPrompt,
    proceedWithCartPrompt,
  } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (loading) {
    return (
      <div role="status" aria-label="Loading product details" className="animate-pulse bg-amber-50">
        <span className="sr-only">Loading product details</span>
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-10 md:grid-cols-2 md:items-center">
          <div aria-hidden="true" className="h-64 rounded-xl bg-white p-5 sm:h-80 md:h-[28rem]">
            <div className="h-full w-full rounded-lg bg-stone-100" />
          </div>
          <div aria-hidden="true" className="flex flex-col gap-4">
            <div className="h-4 w-28 rounded bg-stone-200" />
            <div className="space-y-2">
              <div className="h-7 w-full rounded bg-stone-200 sm:h-8" />
              <div className="h-7 w-3/4 rounded bg-stone-200 sm:h-8" />
            </div>
            <div className="h-7 w-24 rounded bg-stone-200" />
            <div className="h-5 w-32 rounded bg-stone-100" />
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-stone-200" />
              <div className="h-4 w-full rounded bg-stone-200" />
              <div className="h-4 w-5/6 rounded bg-stone-200" />
              <div className="h-4 w-2/3 rounded bg-stone-200" />
            </div>
            <div className="mt-1 flex gap-3">
              <div className="h-11 w-32 rounded bg-stone-200" />
              <div className="h-11 w-36 rounded bg-stone-300" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="px-4 py-20 text-center text-red-700">
        Error in fetching data
      </div>
    );
  }

  if (!product) {
    return (
      <div className="px-4 py-20 text-center text-stone-600">
        Product not found
      </div>
    );
  }

  const cartQuantity =
    cart.find((item) => item.id === product.id)?.quantity ?? 0;

  return (
    <div className="bg-amber-50">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-10 md:grid-cols-2 md:items-center">
        {/* Product Image */}
        <div className="flex h-64 items-center justify-center rounded-xl bg-white p-5 sm:h-80 md:h-[28rem]">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain"
          />
        </div>

        {/* Product Information */}
        <div className="flex flex-col justify-center gap-3.5">
          <p className="text-sm uppercase text-gray-500">{product.category}</p>

          <h1 className="break-words text-2xl font-bold sm:text-3xl">
            {product.title}
          </h1>

          <p className="text-2xl font-bold">${product.price}</p>

          {cartQuantity > 0 && (
            <p className="text-sm text-gray-600">In cart: {cartQuantity}</p>
          )}
          <div>
            <span className="font-semibold">⭐</span> {product.rating?.rate} / 5
            ({product.rating?.count})
          </div>

          <p className="leading-relaxed text-gray-700">{product.description}</p>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <label htmlFor="product-quantity" className="sr-only">
                Quantity for {product.title}
              </label>
              <button
                type="button"
                aria-label={`Decrease quantity of ${product.title}`}
                onClick={() =>
                  setQuantity((current) => Math.max(1, current - 1))
                }
                disabled={quantity <= 1}
                className="h-8 w-8 rounded border disabled:cursor-not-allowed disabled:opacity-40"
              >
                −
              </button>
              <input
                id="product-quantity"
                type="number"
                min="1"
                max="10"
                step="1"
                value={quantity}
                onChange={(event) => {
                  const value = event.target.value;
                  if (value === "") return;
                  setQuantity(Math.max(1, Number(value) || 1));
                }}
                className="w-16 rounded border px-2 py-1 text-center"
              />
              <button
                type="button"
                aria-label={`Increase quantity of ${product.title}`}
                onClick={() => setQuantity((current) => current + 1)}
                className="h-8 w-8 rounded border"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                if (addToCart(product, quantity)) navigate("/cart");
              }}
              className="min-h-11 flex-1 rounded-md bg-black px-4 py-3 text-center text-sm text-amber-50 transition hover:bg-gray-800 sm:flex-none sm:px-6 sm:text-base"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <Popup
        prompt={cartPrompt}
        onCancel={cancelCartPrompt}
        onProceed={() => {
          if (proceedWithCartPrompt()) navigate("/cart");
        }}
      />
    </div>
  );
}

export default ProductDetails;
