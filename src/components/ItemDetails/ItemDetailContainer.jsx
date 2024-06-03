import { useEffect, useState } from "react";
import "../SpinnerLoader/SpinnerLoader.css";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";
import { db } from "../../services/firebase";
import { doc, getDoc } from "firebase/firestore";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const { itemId } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        setLoading(true);
        const response = await getDoc(doc(db, "Products", itemId));
        const product = { id: response.id, ...response.data() };
        setProduct(product);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductById();
  }, [itemId]);

  if (loading) {
    return (
      <div className="flex flex-row justify-center pt-5 pb-[48%]">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <div className="pt-4 px-12 min-h-[81vh]">
        <ItemDetail {...{ ...product, loading }} />
      </div>
    </>
  );
};

export default ItemDetailContainer;
