import { useState } from "react";
import useFetch from "../hooks/useFetch";
import ProductCard from "../components/ProductCard";

function Products() {
  const { data, error, loading } = useFetch(
    "https://fakestoreapi.com/products",
  );
  const [selectedCategory, setSelectedCategory] = useState("All Products");

  if (loading) {
    return (
      <div
        role="status"
        className="mx-auto max-w-5xl px-4 py-20 text-center text-stone-500"
      >
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="mx-auto max-w-5xl px-4 py-20 text-center text-red-700"
      >
        We couldn't load the products. Please try again.
      </div>
    );
  }

  const categories = [
    ...new Set((data ?? []).map((product) => product.category).filter(Boolean)),
  ];
  const visibleProducts =
    selectedCategory === "All Products"
      ? data
      : data.filter((product) => product.category === selectedCategory);

  return (
    <main className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
      <div className="mb-2 mt-5 text-center text-2xl font-bold tracking-tight text-stone-900 md:text-4xl">
        Shop our products
      </div>
      <p className="mb-8 text-center text-stone-500 md:text-lg">
        Thoughtful finds for every day.
      </p>
      <div
        aria-label="Filter products by category"
        className="-mx-4 mb-6 overflow-x-auto px-4 sm:mx-0 sm:px-0"
      >
        <div className="flex w-max min-w-full gap-2 pb-2 sm:w-auto sm:min-w-0 sm:justify-center">
          {["All Products", ...categories].map((category) => {
            const isSelected = selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedCategory(category)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  isSelected
                    ? "border-stone-900 bg-stone-900 text-white"
                    : "border-stone-300 bg-white text-stone-700 hover:border-stone-500"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {visibleProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </main>
  );
}

export default Products;
