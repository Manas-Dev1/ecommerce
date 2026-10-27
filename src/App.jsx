import "./App.css";
import { Routes, Route, Link } from "react-router-dom";

import { Cart, CheckOut, ProductDetails, Products } from "./pages/index";

import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Products />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/checkout" element={<CheckOut />} />

        <Route
          path="*"
          element={
            <main className="mx-auto max-w-5xl px-4 py-20 text-center">
              <h1 className="text-3xl font-bold">Page not found</h1>
              <p className="mt-2 text-stone-600">
                The page you’re looking for doesn’t exist.
              </p>
              <Link
                to="/"
                className="mt-6 inline-block rounded-md bg-black px-5 py-3 text-white"
              >
                Back to home
              </Link>
            </main>
          }
        />
      </Routes>
    </>
  );
}

export default App;
