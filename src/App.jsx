import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemList/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetails/ItemDetailContainer";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart/Cart";
import Footer from "./components/Footer/Footer";
import { NotificationProvider } from "./context/Notification";
import Checkout from "./components/Checkout/Checkout";
import ErrorPage from "./components/ErrorPage/ErrorPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <NotificationProvider>
          <CartProvider>
            <NavBar />
            <Routes>
              <Route path="/" element={<ItemListContainer />} />
              <Route
                path="/category/:categoryId"
                element={<ItemListContainer />}
              />
              <Route path="/item/:itemId" element={<ItemDetailContainer />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </CartProvider>
        </NotificationProvider>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
