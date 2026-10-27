import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Summary from "../components/Summry";

function Checkout() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const pincodeRequestId = useRef(0);
  async function getPincodeDetails(pincode) {
    const requestId = ++pincodeRequestId.current;

    if (!/^[1-9][0-9]{5}$/.test(pincode)) {
      setFormData((prev) => ({
        ...prev,
        city: "",
        state: "",
      }));
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`,
      );
      if (!response.ok) throw new Error("PIN lookup failed");

      const data = await response.json();

      if (requestId !== pincodeRequestId.current) return;

      const result = Array.isArray(data) ? data[0] : null;
      const office = Array.isArray(result?.PostOffice)
        ? result.PostOffice[0]
        : null;

      if (
        result?.Status !== "Success" ||
        typeof office?.Name !== "string" ||
        typeof office?.State !== "string"
      ) {
        setError("Invalid PIN code");

        setFormData((prev) => ({
          ...prev,
          city: "",
          state: "",
        }));

        return;
      }

      setFormData((prev) => ({
        ...prev,
        city: office.Name,
        state: office.State,
      }));
    } catch (error) {
      if (requestId === pincodeRequestId.current) {
        setError("Unable to verify PIN code");
      }
    } finally {
      if (requestId === pincodeRequestId.current) setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "pincode") {
      const onlyNumbers = value.replace(/\D/g, "").slice(0, 6);

      setFormData((prev) => ({
        ...prev,
        pincode: onlyNumbers,
      }));

      if (onlyNumbers.length === 6) {
        getPincodeDetails(onlyNumbers);
      } else {
        pincodeRequestId.current += 1;
        setLoading(false);
        setError("");

        setFormData((prev) => ({
          ...prev,
          city: "",
          state: "",
        }));
      }

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const name = formData.name.trim();
    const address = formData.address.trim();
    if (!name || address.length < 10) {
      setError(
        !name
          ? "Please enter your full name"
          : "Please enter an address of at least 10 characters",
      );
      return;
    }

    if (loading || error || !formData.city || !formData.state) {
      setError(error || "Please wait for a valid PIN code to be verified");
      return;
    }

    setFormData((prev) => ({ ...prev, name, address }));
    setShowSuccess(true);
    clearCart();
    window.setTimeout(() => navigate("/"), 2000);
  }

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>

          <p className="mt-2 text-gray-500">Enter your delivery details</p>
        </div>

        <div className=" rounded-xl shadow-sm border p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                minLength={1}
                maxLength={50}
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-3 py-2.5 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Address
              </label>

              <textarea
                id="address"
                name="address"
                minLength={10}
                required
                rows={4}
                value={formData.address}
                onChange={handleChange}
                placeholder="House no., street, area..."
                className="w-full px-3 py-2.5 rounded-lg border border-gray-300 outline-none resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="pincode"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  PIN Code
                </label>

                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  required
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="e.g. 360001"
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                {loading && (
                  <p className="mt-1 text-sm text-gray-500">
                    Checking PIN code...
                  </p>
                )}

                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  City / Post Office
                </label>

                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  readOnly
                  placeholder="City will be detected"
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 bg-gray-100 outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                State
              </label>

              <input
                id="state"
                name="state"
                type="text"
                value={formData.state}
                readOnly
                placeholder="State will be detected"
                className="w-full px-3 py-2.5 rounded-lg border border-gray-300 bg-gray-100 outline-none"
              />
            </div>
            <div>
              <Summary />
            </div>
            <button
              type="submit"
              disabled={cart.length === 0 || showSuccess}
              className="w-full rounded-lg bg-black py-3 font-medium text-white transition enabled:hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>

      {showSuccess && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-success-title"
        >
          <div className="w-full max-w-sm rounded-xl bg-amber-50 p-6 text-center shadow-xl">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
              OK
            </div>
            <h2
              id="checkout-success-title"
              className="text-xl font-semibold text-gray-900"
            >
              Order placed successfully!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Redirecting you to the home page...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
