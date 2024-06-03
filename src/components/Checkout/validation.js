export const validateInput = (userData, setNotification) => {
  if (
    !userData.firstName ||
    !userData.lastName ||
    !userData.phone ||
    !userData.email
  ) {
    setNotification(
      "warning",
      `Error: No se ingresaron todos los datos requeridos.`,
    );
    return false;
  }

  // Validar el formato del correo electrónico utilizando una expresión regular
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(userData.email)) {
    setNotification(
      "warning",
      `Error: El formato del correo electrónico es inválido.`,
    );
    return false;
  }

  // Validar el formato del número de teléfono (podrías usar una expresión regular o verificar la longitud)
  // Supongamos que el número de teléfono debe tener exactamente 10 dígitos
  if (!/^\d{10}$/.test(userData.phone)) {
    setNotification(
      "warning",
      `Error: El número de teléfono debe tener exactamente 10 dígitos.`,
    );
    return false;
  }

  // Si todas las validaciones pasaron, devolver true indicando que la validación fue exitosa
  return true;
};
