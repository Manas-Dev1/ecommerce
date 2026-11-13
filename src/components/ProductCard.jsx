import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex min-w-0 flex-col rounded-xl border border-stone-200 bg-white p-2 transition duration-200 hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900 sm:p-3"
    >
      <div className="flex aspect-square items-center justify-center rounded-lg bg-stone-50 p-3 sm:p-4">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="aspect-square w-full object-contain transition duration-200 group-hover:scale-105"
        />
      </div>
      <h2 className="mt-3 line-clamp-2 min-h-10 text-xs font-medium leading-5 text-stone-800 sm:min-h-12 sm:text-sm sm:leading-6">
        {product.title}
      </h2>
      <p className="mt-2 text-base font-bold text-stone-950 sm:text-lg">
        ${product.price.toFixed(2)}
      </p>
    </Link>
  );
}

export default ProductCard;
