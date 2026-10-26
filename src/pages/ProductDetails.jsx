import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();

  const {
    data: product,
    error,
    loading,
  } = useFetch(`https://fakestoreapi.com/products/${id}`);

  const { addToCart, cart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (loading) {
    return <div>Data is loading...</div>;
  }

  if (error) {
    return <div>Error in fetching data</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const cartQuantity =
    cart.find((item) => item.id === product.id)?.quantity ?? 0;

  return (
    <div className="bg-amber-50">
      <div className="mx-auto grid max-w-5xl gap-8 rounded-lg px-4 py-8 md:grid-cols-2">
        {/* Product Image */}
        <div className="flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="h-100 w-full object-contain"
          />
        </div>

        {/* Product Information */}
        <div className="flex flex-col justify-center gap-3.5">
          <p className="text-sm uppercase text-gray-500">{product.category}</p>

          <h1 className="text-3xl font-bold">{product.title}</h1>

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
            <label htmlFor="product-quantity" className="font-medium">
              Quantity
            </label>
            <input
              id="product-quantity"
              type="number"
              min="1"
              step="1"
              value={quantity}
              onChange={(event) =>
                setQuantity(Math.max(1, Number(event.target.value) || 1))
              }
              className="w-20 rounded-md border border-gray-300 px-3 py-2"
            />
            <Link
              to="/cart"
              onClick={() => addToCart(product, quantity)}
              className="rounded-md bg-black px-6 py-3 text-center text-amber-50 transition hover:bg-gray-800"
            >
              Add to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
