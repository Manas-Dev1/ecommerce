import useFetch from "../hooks/useFetch";
import ProductCard from "../components/ProductCard";
import bannerImage from "../assets/EasyCart_ Shopping Made Simple.png";

function Products() {
  const { data, error, loading } = useFetch(
    "https://fakestoreapi.com/products",
  );

  if (loading) {
    return (
      <div
        role="status"
        className="mx-auto max-w-5xl px-4 py-20 text-center text-stone-500"
      >
        Loading products…
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="mx-auto max-w-5xl px-4 py-20 text-center text-red-700"
      >
        We couldn’t load the products. Please try again.
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
      <img src={bannerImage} alt="EasyCart: Shopping Made Simple" />
      <div className="mb-2 text-center mt-5 text-2xl md:text-4xl font-bold tracking-tight text-stone-900">
        Shop our products
      </div>
      <p className="mb-8 text-center md:text-lg text-stone-500">
        Thoughtful finds for every day.
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {data.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </main>
  );
}

export default Products;
