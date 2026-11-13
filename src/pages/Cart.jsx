import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Summary from "../components/Summry";
import Popup from "../components/Popup";

function Cart() {
  const {
    cart,
    cartPrompt,
    cancelCartPrompt,
    proceedWithCartPrompt,
    removeFromCart,
    updateQuantity,
  } = useCart();

  return (
    <main className="mx-auto w-full max-w-4xl px-3 py-5 sm:px-6 sm:py-8">
      <h1 className="mb-4 text-2xl font-bold sm:text-3xl">Cart</h1>

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
              className="mb-4 block w-fit rounded-md px-3 py-2 text-center ring transition hover:bg-black hover:text-amber-50"
            >
              ← Continue Shopping
            </Link>
            {cart.map((product) => (
              <div
                key={product.id}
                className="mb-3 grid w-full grid-cols-[4rem_minmax(0,1fr)] items-center gap-x-3 gap-y-3 rounded-md border p-3 sm:grid-cols-[8rem_minmax(0,1fr)_auto] sm:gap-4 sm:p-4"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-16 w-16 object-contain sm:h-24 sm:w-24 md:h-32 md:w-32"
                />

                <div className="flex min-w-0 flex-1 flex-col">
                  <h2 className="line-clamp-2 text-sm sm:text-base">
                    {product.title}
                  </h2>

                  <p className="text-sm text-gray-600">
                    ${product.price.toFixed(2)} each
                  </p>
                  <p className="text-md font-bold">
                    ${(product.price * product.quantity).toFixed(2)}
                  </p>
                </div>

                <div className="col-span-2 flex w-full items-center justify-start gap-3 sm:col-span-1 sm:ml-auto sm:w-auto">
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
                      className="h-10 w-10 rounded border disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      −
                    </button>
                    <input
                      id={`quantity-${product.id}`}
                      type="number"
                      min="1"
                      max="10"
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
                      className="h-10 w-20 rounded border px-2 py-1 text-center"
                    />
                    <button
                      type="button"
                      aria-label={`Increase quantity of ${product.title}`}
                      onClick={() =>
                        updateQuantity(product.id, product.quantity + 1)
                      }
                      className="h-10 w-10 rounded border"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(product.id)}
                    aria-label={`Remove ${product.title} from cart`}
                    title={`Remove ${product.title}`}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-red-600 ring-1 ring-red-500 transition hover:bg-red-500 hover:text-white"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 7h16M10 11v6m4-6v6M5.5 7l1 13h11l1-13M9 7V4h6v3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Summary />
          <Link
            to="/checkout"
            className="mx-auto mt-5 block w-full rounded-md bg-black px-5 py-3 text-center text-amber-50 sm:w-fit"
          >
            Proceed to Checkout
          </Link>
        </>
      )}
      <Popup
        prompt={cartPrompt}
        onCancel={cancelCartPrompt}
        onProceed={proceedWithCartPrompt}
      />
    </main>
  );
}

export default Cart;
