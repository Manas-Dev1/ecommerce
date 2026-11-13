import { useCart } from "../context/CartContext";

function Summary({ showItems = false }) {
  const { cart } = useCart();

  const total = cart.reduce((sum, product) => {
    return sum + product.price * product.quantity;
  }, 0);

  return (
    <div className="rounded-md border p-5">
      <h2 className="mb-4 text-xl font-bold">Order Summary</h2>

      {showItems && (
        <ul className="mb-5 max-h-96 space-y-4 overflow-y-auto">
          {cart.map((product) => (
            <li
              key={product.id}
              className="flex gap-3 border-b pb-4 last:border-0"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-16 w-16 shrink-0 rounded-md bg-white object-contain"
              />
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-sm font-medium text-gray-900">
                  {product.title}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Qty {product.quantity} × ${product.price.toFixed(2)}
                </p>
              </div>
              <p className="shrink-0 text-sm font-semibold">
                ${(product.price * product.quantity).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-between border-t pt-4">
        <span className="font-semibold">Total</span>

        <span className="text-xl font-bold">${total.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default Summary;
