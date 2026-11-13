import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";

function Navbar() {
  const productsMenuRef = useRef(null);
  const headerRef = useRef(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const { cart } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    function closeProductsMenu(event) {
      if (!productsMenuRef.current?.contains(event.target)) {
        productsMenuRef.current?.removeAttribute("open");
      }
    }

    document.addEventListener("pointerdown", closeProductsMenu);
    return () => document.removeEventListener("pointerdown", closeProductsMenu);
  }, []);

  useEffect(() => {
    function closeDrawerOnEscape(event) {
      if (event.key === "Escape") setIsDrawerOpen(false);
    }

    function closeDrawerOnOutsideClick(event) {
      if (isDrawerOpen && !headerRef.current?.contains(event.target)) {
        closeDrawer();
      }
    }

    document.addEventListener("keydown", closeDrawerOnEscape);
    document.addEventListener("pointerdown", closeDrawerOnOutsideClick);
    return () => {
      document.removeEventListener("keydown", closeDrawerOnEscape);
      document.removeEventListener("pointerdown", closeDrawerOnOutsideClick);
    };
  }, [isDrawerOpen]);

  const categories = [
    "men's clothing",
    "jewelery",
    "electronics",
    "women's clothing",
  ];

  function closeDrawer() {
    setIsDrawerOpen(false);
    setIsMobileProductsOpen(false);
  }

  function categoryLink(category, className) {
    return (
      <Link
        key={category}
        to="/products"
        state={{ selectedCategory: category }}
        onClick={closeDrawer}
        className={className}
      >
        {category}
      </Link>
    );
  }

  return (
    <header ref={headerRef} className="sticky top-0 z-10 w-full border-b border-stone-200 bg-amber-50 px-4 shadow-sm backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="relative mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-2 py-3 sm:py-4"
      >
        <button
          type="button"
          aria-label={isDrawerOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isDrawerOpen}
          aria-controls="mobile-navigation-drawer"
          onClick={() => setIsDrawerOpen((open) => !open)}
          className="col-start-1 row-start-1 flex h-9 w-9 items-center justify-center rounded-md text-stone-700 transition hover:bg-white hover:text-black sm:hidden"
        >
          <span className="text-2xl leading-none" aria-hidden="true">
            {isDrawerOpen ? "×" : "☰"}
          </span>
        </button>
        <div className="hidden min-w-0 items-center gap-2 sm:col-start-1 sm:row-start-1 sm:flex sm:gap-6">
          <Link
            to="/"
            className="whitespace-nowrap text-sm font-medium text-stone-600 transition hover:text-black"
          >
            Home
          </Link>
          <details ref={productsMenuRef} className="group relative">
            <summary className="cursor-pointer list-none whitespace-nowrap text-sm font-medium text-stone-600 transition hover:text-black [&::-webkit-details-marker]:hidden">
              Products <span aria-hidden="true">▾</span>
            </summary>
            <div className="absolute left-0 top-full z-20 mt-3 w-56 max-w-[calc(100vw-2rem)] rounded-lg border border-stone-200 bg-white p-2 shadow-lg">
              <Link
                to="/products"
                state={{ selectedCategory: "All Products" }}
                onClick={(event) =>
                  event.currentTarget
                    .closest("details")
                    ?.removeAttribute("open")
                }
                className="block rounded-md px-3 py-2 text-sm font-semibold text-stone-900 hover:bg-stone-100"
              >
                All Products
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  to="/products"
                  state={{ selectedCategory: category }}
                  onClick={(event) =>
                    event.currentTarget
                      .closest("details")
                      ?.removeAttribute("open")
                  }
                  className="block rounded-md px-3 py-2 text-sm capitalize text-stone-700 hover:bg-stone-100"
                >
                  {category}
                </Link>
              ))}
            </div>
          </details>
        </div>
        <Link
          to="/"
          className="col-start-2 row-start-1 whitespace-nowrap text-base font-bold tracking-tight text-stone-900 sm:text-xl"
        >
          EasyCart
        </Link>
        <Link
          to="/cart"
          aria-label={`Cart, ${itemCount} items`}
          className="col-start-3 row-start-1 justify-self-end whitespace-nowrap rounded-full bg-white px-2 py-2 text-xs font-medium text-stone-700 transition hover:bg-stone-100 hover:text-black sm:px-3 sm:text-sm"
        >
          🛒{" "}
          <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-stone-900 px-1.5 py-0.5 text-xs font-semibold text-white">
            {itemCount}
          </span>
        </Link>
      </nav>
      {isDrawerOpen && (
        <>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeDrawer}
            className="fixed inset-x-0 bottom-0 top-[4rem] z-20 bg-black/30 sm:hidden"
          />
          <div
            id="mobile-navigation-drawer"
            className="absolute left-0 right-0 top-full z-30 border-t border-stone-200 bg-amber-50 px-4 py-3 shadow-lg sm:hidden"
          >
            <nav aria-label="Mobile navigation" className="mx-auto max-w-6xl">
              <Link
                to="/"
                onClick={closeDrawer}
                className="block rounded-md px-3 py-3 text-sm font-medium text-stone-700 hover:bg-white"
              >
                Home
              </Link>
              <button
                type="button"
                aria-expanded={isMobileProductsOpen}
                onClick={() => setIsMobileProductsOpen((open) => !open)}
                className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-sm font-medium text-stone-700 hover:bg-white"
              >
                Products <span aria-hidden="true">{isMobileProductsOpen ? "▴" : "▾"}</span>
              </button>
              {isMobileProductsOpen && (
                <div className="ml-3 border-l border-stone-200 pl-3">
                  {categoryLink(
                    "All Products",
                    "block rounded-md px-3 py-2 text-sm font-semibold text-stone-900 hover:bg-white",
                  )}
                  {categories.map((category) =>
                    categoryLink(
                      category,
                      "block rounded-md px-3 py-2 text-sm capitalize text-stone-700 hover:bg-white",
                    ),
                  )}
                </div>
              )}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}

export default Navbar;
