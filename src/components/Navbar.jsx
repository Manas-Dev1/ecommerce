import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { cart } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-10 w-full border-b border-stone-200 bg-amber-50 px-4 shadow-sm backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-5xl items-center justify-between py-4"
      >
        <Link
          to="/"
          className="text-sm font-medium text-stone-600 transition hover:text-black"
        >
          Home
        </Link>
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-stone-900"
        >
          EasyCart
        </Link>
        <Link
          to="/cart"
          aria-label={`Cart, ${itemCount} items`}
          className="rounded-full px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100 bg-white hover:text-black"
        >
          🛒{" "}
          <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-stone-900 px-1.5 py-0.5 text-xs font-semibold text-white">
            {itemCount}
          </span>
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
