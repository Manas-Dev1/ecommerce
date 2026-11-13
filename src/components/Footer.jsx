import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-12 bg-stone-900 text-stone-200">
      <div className="mx-auto flex justify-between items-center max-w-6xl gap-8 px-4 py-8 sm:grid-cols-3 sm:px-6 sm:py-10">
        <div>
          <h2 className="font-semibold text-white">Explore</h2>
          <div className="mt-3 flex flex-col items-start gap-2 text-sm">
            <Link className="hover:text-white" to="/products">
              Products
            </Link>
            <Link className="hover:text-white" to="/about">
              About Us
            </Link>
            <Link className="hover:text-white" to="/contact">
              Contact Us
            </Link>
          </div>
        </div>
        {/* <div className="flex flex-col items-center gap-2 text-sm">
          <p className="mt-2 max-w-xs text-sm text-stone-400">
            Thoughtful finds for every day, delivered with care.
          </p>
          <p className="mt-2 max-w-xs text-sm text-stone-400">
            Contact us at :abc@gmail.com
          </p>
        </div> */}
        <Link to="/" className="text-3xl font-bold text-white">
          EasyCart
        </Link>
      </div>
      <p className="text-sm text-stone-400 text-center mb-4">
        © {new Date().getFullYear()} EasyCart. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
