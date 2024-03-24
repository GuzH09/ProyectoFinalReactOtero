import { useCart } from "../../context/CartContext";
import CartItem from "../CartItem/CartItem";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, clearCart, totalQuantity, total } = useCart();

  if (totalQuantity === 0) {
    return (
      <div className="py-4 flex flex-col items-center min-h-[81vh]">
        <h1>No hay items en el carrito</h1>
        <Link
          to="/"
          className="rounded bg-blue-50 py-2 px-2 my-2 text-xs font-medium text-blue-700 ring-1 ring-blue-600"
        >
          Productos
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-4 px-56 flex flex-column items-center min-h-[81vh]">
      {cart.map((p) => (
        <CartItem key={p.id} {...p} />
      ))}
      <h3 className="font-bold">Total: ${total}</h3>
      <button
        className="rounded bg-blue-50 py-2 px-2 my-2 text-xs font-medium text-blue-700 ring-1 ring-blue-600"
        onClick={() => clearCart()}
      >
        Limpiar carrito
      </button>
      <Link
        className="rounded bg-blue-50 py-2 px-2 my-2 text-xs font-medium text-blue-700 ring-1 ring-blue-600"
        to="/checkout"
      >
        Checkout
      </Link>
    </div>
  );
};

export default Cart;
