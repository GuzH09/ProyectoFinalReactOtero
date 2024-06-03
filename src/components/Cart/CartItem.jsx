import { useCart } from "../../context/CartContext";

const CartItem = ({ id, name, price, quantity }) => {
  const { removeItem, totalQuantity, total, setTotalQuantity, setTotal } =
    useCart();

  const handleOnRemove = (id) => {
    removeItem(id);
    setTotalQuantity(totalQuantity - quantity);
    setTotal(total - price * quantity);
  };

  return (
    <article className="flex w-full justify-between items-center rounded bg-blue-50 py-4 px-4 my-2 text-xs font-medium text-blue-700 ring-1 ring-blue-600">
      <h2 className="font-bold w-48 text-left">{name}</h2>

      <h3 className="w-48 text-center">Cantidad: {quantity}</h3>

      <h3 className="w-48 text-center">Precio x Unidad: ${price}</h3>

      <h3 className="w-48 text-right">Subtotal: ${price * quantity}</h3>

      <button
        className="rounded bg-blue-50 py-2 px-2 my-2 text-xs font-medium text-blue-700 ring-1 ring-blue-600"
        onClick={() => handleOnRemove(id)}
      >
        X
      </button>
    </article>
  );
};

export default CartItem;
