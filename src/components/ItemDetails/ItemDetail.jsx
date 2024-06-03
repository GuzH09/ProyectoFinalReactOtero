import ItemCount from "./ItemCount";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useNotification } from "../../context/Notification";
import "../SpinnerLoader/SpinnerLoader.css";
import useProductImage from "../../hooks/useProductImage";

const ItemDetail = ({
  id,
  name,
  img,
  category,
  description,
  price,
  stock,
  loading,
}) => {
  const [quantityAdded, setQuantityAdded] = useState(0);
  const { setNotification } = useNotification();
  const { addItem } = useCart();
  const { imgURL, loadingItem } = useProductImage(img, loading);

  const handleOnAdd = (quantity) => {
    setNotification("success", `Se agregaron ${quantity} de ${name}`);
    setQuantityAdded(quantity);

    const item = {
      id,
      name,
      price,
    };

    addItem(item, quantity);
  };

  if (loadingItem) {
    return (
      <div className="flex flex-row justify-center pt-5 pb-[37%]">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <article className="items-center flex flex-col">
      <header>
        <h2 className="font-bold">{name}</h2>
      </header>
      <picture className="h-72 w-42 p-3">
        <img className="h-full" src={imgURL} alt={name} />
      </picture>
      <section className="text-center">
        <p>Categoria: {category}</p>
        <p>Descripcion: {description}</p>
        <p>Precio: ${price}</p>
        <p>Stock disponible: {stock}</p>
      </section>
      <footer className="py-3">
        {quantityAdded > 0 ? (
          <div className="flex flex-row gap-2">
            <Link
              className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-600"
              to="/"
            >
              Continuar Comprando
            </Link>
            <Link
              className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-600"
              to="/cart"
            >
              Terminar Compra
            </Link>
          </div>
        ) : (
          <ItemCount initial={1} stock={stock} onAdd={handleOnAdd} />
        )}
      </footer>
    </article>
  );
};

export default ItemDetail;
