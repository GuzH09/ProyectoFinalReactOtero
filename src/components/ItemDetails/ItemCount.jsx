import { useState } from "react";

const ItemCount = ({ stock, initial, onAdd }) => {
  const [quantity, setQuantity] = useState(initial);

  const increment = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      <div className="flex flex-row text-center justify-around">
        <button
          className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-600"
          onClick={decrement}
        >
          -
        </button>
        <h4 className="font-bold">{quantity}</h4>
        <button
          className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-600"
          onClick={increment}
        >
          +
        </button>
      </div>
      <div className="py-3">
        {stock > 0 ? (
          <button
            className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-600"
            onClick={() => onAdd(quantity)}
          >
            Agregar al carrito
          </button>
        ) : (
          <button
            className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600"
            disabled={true}
          >
            No hay Stock
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemCount;
