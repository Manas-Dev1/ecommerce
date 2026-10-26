import React from "react";
import useFetch from "../hooks/useFetch";
import ProductCard from "../components/ProductCard";

function Products() {
  const { data, error, loading } = useFetch(
    "https://fakestoreapi.com/products",
  );

  if (loading) {
    return <div>Data is loading...</div>;
  }

  if (error) {
    return <div>Error in fetching data</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center font-semibold text-2xl mb-1">
        Shop Our Amazing Products{" "}
      </div>
      <div className="flex flex-wrap gap-3 justify-center pt-3">
        {data.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}

export default Products;
