import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="max-w-2xs min-w-2xs ring ring-black/30 p-3 flex flex-col gap-0 rounded-md shadow-sm shadow-black/50 hover:shadow-md"
    >
      <img src={product.image} alt={product.title} className="aspect-square" />

      <h2 className="text-md mt-2 ">{product.title}</h2>

      <p className="font-bold text-lg mt-auto">${product.price}</p>

      {/* <p className="text-gray-700">{product.category}</p> */}
    </Link>
  );
}

export default ProductCard;
