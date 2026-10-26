import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="w-full shadow-xs shadow-black/30 px-3">
      <div className="flex justify-between py-4 mb-3 mx-auto max-w-4xl">
        <Link to="/">Home</Link>
        <Link to="/" className="text-xl font-bold">
          EasyCart
        </Link>
        <Link to="/cart">🛒</Link>
      </div>
    </div>
  );
}

export default Navbar;
