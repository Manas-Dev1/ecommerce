import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { Cart, CheckOut, ProductDetails, Products } from "./pages/index";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import bannerImage from "./assets/EasyCart_ Shopping Made Simple.webp";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <img
                  src={bannerImage}
                  alt="EasyCart: Shopping Made Simple"
                  className="mx-auto block h-auto w-full max-w-7xl p-1 sm:px-6"
                />
                <Products />{" "}
              </>
            }
          />

          <Route path="/products" element={<Products />} />

          <Route path="/about" element={<AboutUs />} />

          <Route path="/contact" element={<ContactUs />} />

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
      </div>
      <Footer />
    </div>
  );
}

export default App;
