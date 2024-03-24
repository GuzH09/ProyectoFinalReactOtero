import { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import BrandHeader from "../BrandHeader/BrandHeader";
import { useNotification } from "../../context/Notification";
import { db } from "../../services/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import "../SpinnerLoader/SpinnerLoader.css";

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const { setNotification } = useNotification();
  const { categoryId } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const collectionRef = categoryId
          ? query(
              collection(db, "Products"),
              where("category", "==", categoryId),
            )
          : collection(db, "Products");
        const response = await getDocs(collectionRef);
        const products = response.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(products);
      } catch (error) {
        setNotification("danger", `No es posible cargar los productos`);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [categoryId]);

  return (
    <>
      <BrandHeader />
      <div className="px-56 py-3 bg-zinc-200 h-full">
        <div className="pb-3">
          {categoryId ? (
            <h1 className="text-center font-medium">{`Productos por ${categoryId}`}</h1>
          ) : (
            <h1 className="text-center font-medium">{`Todos nuestros productos`}</h1>
          )}
        </div>
        {loading ? (
          <div className="flex flex-row items-baseline justify-center pt-4 bg-white min-h-[50vh]">
            <div className="loader"></div>
          </div>
        ) : (
          <ItemList products={products} />
        )}
      </div>
    </>
  );
};

export default ItemListContainer;
