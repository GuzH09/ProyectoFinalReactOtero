import { useEffect, useState } from "react";
import { ref, getDownloadURL, getStorage } from "firebase/storage";

const useProductImage = (img, loading) => {
  const [loadingItem, setLoading] = useState(loading);
  const [imgURL, setImgURL] = useState("");
  const storage = getStorage();

  useEffect(() => {
    const getImage = async () => {
      try {
        setLoading(true);
        const url = await getDownloadURL(ref(storage, img));
        setImgURL(url);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getImage();
  }, [img]);

  return { imgURL, loadingItem };
};

export default useProductImage;
