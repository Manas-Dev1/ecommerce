import React, { useState } from "react";
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
  const { cart } = useCart();
  async function getPincodeDetails(pincode) {
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

      const data = await response.json();

      if (data[0].Status !== "Success") {
        setError("Invalid PIN code");

        setFormData((prev) => ({
          ...prev,
          city: "",
          state: "",
        }));

        return;
      }

      const office = data[0].PostOffice[0];

      setFormData((prev) => ({
        ...prev,
        city: office.Name,
        state: office.State,
      }));
    } catch (error) {
      setError("Unable to verify PIN code");
    } finally {
      setLoading(false);
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

    console.log("Order details:", formData);
  }

  return (
    <div className="min-h-scree px-4 py-10">
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
              className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
