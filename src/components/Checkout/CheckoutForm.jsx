import { useState } from "react";
import { useNotification } from "../../context/Notification.jsx";
import { validateInput } from "./validation.js";

const CheckoutForm = ({ onConfirm }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const { setNotification } = useNotification();

  const handleConfirm = (event) => {
    event.preventDefault();

    const userData = {
      firstName,
      lastName,
      phone,
      email,
    };

    if (!validateInput(userData, setNotification)) {
      return;
    }

    onConfirm(userData);
  };

  return (
    <div className="min-h-[76vh]">
      <form
        onSubmit={handleConfirm}
        className="pt-4 px-56 flex flex-column items-center"
      >
        <label className="">Nombre</label>
        <input
          className="w-1/3 rounded bg-blue-50 py-2 px-2 my-2 text-xs font-medium text-black ring-1 ring-blue-600"
          type="text"
          value={firstName}
          onChange={({ target }) => setFirstName(target.value)}
        />

        <label className="">Apellido</label>
        <input
          className="w-1/3 rounded bg-blue-50 py-2 px-2 my-2 text-xs font-medium text-black ring-1 ring-blue-600"
          type="text"
          value={lastName}
          onChange={({ target }) => setLastName(target.value)}
        />

        <label className="">Telefono</label>
        <input
          className="w-1/3 rounded bg-blue-50 py-2 px-2 my-2 text-xs font-medium text-black ring-1 ring-blue-600"
          type="tel"
          value={phone}
          onChange={({ target }) => setPhone(target.value)}
        />

        <label className="">Email</label>
        <input
          className="w-1/3 rounded bg-blue-50 py-2 px-2 my-2 text-xs font-medium text-black ring-1 ring-blue-600"
          type="email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />

        <div className="">
          <button
            type="submit"
            className="rounded bg-blue-50 py-2 px-2 my-2 text-xs font-medium text-blue-700 ring-1 ring-blue-600"
          >
            Generar orden de compra
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
