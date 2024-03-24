import cart from "./assets/shoppingcart.svg";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

const CartWidget = () => {
  const { totalQuantity } = useCart();

  return (
    <Link to="/cart">
      <div className="flex flex-row items-center justify-end">
        <p className="font-bold text-[#21232A] text-sm">{totalQuantity}</p>
        <img src={cart} alt="cart-widget" />
      </div>
    </Link>
  );
};

export default CartWidget;
