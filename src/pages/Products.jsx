import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ProductCard from "../components/ProductCard";

function Products() {
  const location = useLocation();
  const categoryTabsRef = useRef(null);
  const categoryTabRefs = useRef(new Map());
  const [selectedCategory, setSelectedCategory] = useState(
    location.state?.selectedCategory ?? "All Products",
  );
  const { data, error, loading } = useFetch(
    "https://fakestoreapi.com/products",
  );
  const categories = [
    ...new Set((data ?? []).map((product) => product.category).filter(Boolean)),
  ];
  useEffect(() => {
    const requestedCategory = location.state?.selectedCategory;
    if (
      requestedCategory === "All Products" ||
      categories.includes(requestedCategory)
    ) {
      setSelectedCategory(requestedCategory);
    }
  }, [location.state, categories.join("|")]);

  useEffect(() => {
    const container = categoryTabsRef.current;
    const tab = categoryTabRefs.current.get(selectedCategory);
    if (!container || !tab) return;

    const containerRect = container.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();
    const left = tabRect.left - containerRect.left + container.scrollLeft;
    const right = left + tabRect.width;

    if (left < container.scrollLeft) {
      container.scrollTo({ left, behavior: "smooth" });
    } else if (right > container.scrollLeft + container.clientWidth) {
      container.scrollTo({ left: right - container.clientWidth, behavior: "smooth" });
    }
  }, [loading, selectedCategory]);

  if (loading) {
    return (
      <main
        role="status"
        aria-label="Loading products"
        className="mx-auto max-w-6xl animate-pulse px-4 py-2 sm:px-6"
      >
        <span className="sr-only">Loading products</span>
        <div className="mb-3 mt-5 flex justify-center">
          <div className="h-8 w-52 rounded-md bg-stone-200 md:h-10 md:w-72" />
        </div>
        <div className="mb-8 flex justify-center">
          <div className="h-5 w-64 max-w-full rounded bg-stone-100" />
        </div>
        <div className="mb-6 flex justify-center gap-2 overflow-hidden pb-2">
          {[20, 24, 28, 24, 20].map((width, index) => (
            <div
              key={index}
              className="h-10 shrink-0 rounded-full bg-stone-200"
              style={{ width: `${width * 4}px` }}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
            <div
              key={index}
              aria-hidden="true"
              className="flex min-w-0 flex-col rounded-xl border border-stone-200 bg-white p-2 sm:p-3"
            >
              <div className="aspect-square rounded-lg bg-stone-100" />
              <div className="mt-3 h-4 w-full rounded bg-stone-200" />
              <div className="mt-2 h-4 w-2/3 rounded bg-stone-200" />
              <div className="mt-3 h-6 w-1/3 rounded bg-stone-100" />
            </div>
          ))}
        </div>
      </main>
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

  const visibleProducts =
    selectedCategory === "All Products"
      ? data
      : data.filter((product) => product.category === selectedCategory);

  return (
    <main className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
      <div className="mb-2 mt-5 text-center text-2xl font-bold tracking-tight text-stone-900 md:text-4xl">
        Shop our products
      </div>
      <p className="mb-8 text-center text-stone-500 md:text-lg">
        Thoughtful finds for every day.
      </p>
      <div ref={categoryTabsRef}
        aria-label="Filter products by category"
        className="-mx-4 mb-6 overflow-x-auto px-4 sm:mx-0 sm:px-0"
      >
        <div className="flex w-max min-w-full gap-2 pb-2 sm:w-auto sm:min-w-0 sm:justify-center">
          {["All Products", ...categories].map((category) => {
            const isSelected = selectedCategory === category;

            return (
              <button
                key={category}
                ref={(element) => {
                  if (element) categoryTabRefs.current.set(category, element);
                  else categoryTabRefs.current.delete(category);
                }}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedCategory(category)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-600 ease-in-out ${
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
      <div
        key={selectedCategory}
        className="products-grid-enter grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      >
        {visibleProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </main>
  );
}

export default Products;
