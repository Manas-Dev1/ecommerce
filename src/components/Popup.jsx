function Popup({ prompt, onProceed, onCancel }) {
  if (!prompt) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onCancel}
    >
      <section
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="cart-limit-title"
        aria-describedby="cart-limit-message"
        className="w-full max-w-sm rounded-xl bg-amber-50 p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="cart-limit-title" className="text-xl font-bold text-stone-900">
          Quantity limit reached
        </h2>
        <p id="cart-limit-message" className="mt-3 text-stone-700">
          {prompt.message}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-stone-300 px-4 py-2 text-stone-700 hover:bg-stone-100"
          >
            Cancel
          </button>
          <button
            type="button"
            autoFocus
            disabled={!prompt.canProceed}
            onClick={onProceed}
            className="rounded-md bg-black px-4 py-2 text-white hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-400"
          >
            Proceed
          </button>
        </div>
      </section>
    </div>
  );
}

export default Popup;
