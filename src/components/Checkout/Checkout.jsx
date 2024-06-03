import { useState } from "react";
import { useCart } from "../../context/CartContext";
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
  writeBatch,
  addDoc,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import CheckoutForm from "./CheckoutForm";
import "../SpinnerLoader/SpinnerLoader.css";

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);
  const [orderId, setOrderId] = useState("");
  const { cart, total, totalQuantity, clearCart } = useCart();

  const createOrder = async ({ firstName, lastName, phone, email }) => {
    try {
      setLoading(true);
      const objOrder = {
        buyer: {
          firstName,
          lastName,
          phone,
          email,
        },
        items: cart,
        totalQuantity,
        total,
        date: new Date(),
      };

      const outOfStock = [];
      const batch = writeBatch(db);

      const ids = cart.map((item) => item.id);
      const collectionRef = collection(db, "Products");
      const productsAddedFromFirestore = await getDocs(
        query(collectionRef, where(documentId(), "in", ids)),
      );
      const { docs } = productsAddedFromFirestore;

      docs.forEach((doc) => {
        const dataDoc = doc.data();
        const stockDB = dataDoc.stock;
        const productAddedToCart = cart.find((prod) => prod.id === doc.id);
        const prodQuantity = productAddedToCart?.quantity;

        if (stockDB >= prodQuantity) {
          batch.update(doc.ref, { stock: stockDB - prodQuantity });
        } else {
          outOfStock.push({ id: doc.id, ...dataDoc });
        }
      });

      if (outOfStock.length === 0) {
        await batch.commit();
        const orderRef = collection(db, "Orders");
        const orderAdded = await addDoc(orderRef, objOrder);
        clearCart();
        setOrderId(orderAdded.id);
        setOrderCreated(true);
      } else {
        setOrderCreated(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-row justify-center pt-5 pb-[37%]">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="py-3">
      <h1 className="text-center font-medium">Checkout</h1>

      {orderCreated ? (
        <div className="flex flex-column items-center pt-5 min-h-[76vh]">
          <h1>El id de su orden es: {orderId}</h1>
          <h1>¡Gracias por su compra!</h1>
        </div>
      ) : (
        <CheckoutForm onConfirm={createOrder} />
      )}
    </div>
  );
};

export default Checkout;
