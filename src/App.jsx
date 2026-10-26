import "./App.css";
import { Routes, Route } from "react-router-dom";

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
      </Routes>
    </>
  );
}

export default App;
