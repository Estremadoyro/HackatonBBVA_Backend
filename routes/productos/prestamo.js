const express = require("express");
const router = express.Router();
const Cliente = require("../../models/Cliente");
const { validEmail } = require("../../functions/misc");
// Prestamos:

// DNI
// Número_Celular
// Correo_electrónico

router.post("/", async (req, res) => {
  const { dni, celular, email } = req.body;

  if (!dni || !celular || !email) {
    res.status(400).json({ error: "Debe llenar todos los campos" });
    return;
  }
  if (dni.length !== 8) {
    res.status(400).json({ error: "Ingrese un número de DNI válido" });
  }
  if (celular.length !== 9) {
    res.status(400).json({ error: "Ingrese un número de Celular válido" });
  }
  if (!validEmail(email)) {
    res.status(400).json({ error: "Ingrese un email válido" });
  }

  const newCliente = new Cliente({
    dni: dni,
    email: email,
    celular: celular,
  });

  try {
    const encontrarCliente = await Cliente.findOne({ dni: dni });
    if (encontrarCliente) {
      res.status(400).json({ error: "Ya existe un prestamo solicitado bajo este DNI" });
      return;
    }
    await newCliente.save();
    const newProducto = {
      nombreProducto: "Prestamo",
    };
    //Agregar producto a nuevo cliente
    const cliente = await Cliente.findOne({ dni: dni });
    cliente.productos.unshift(newProducto);
    await cliente.save();

    res.status(200).json({ cliente: clte, msg: `Prestamo obtenido exitosmanete al cliente ${dni}` });
  } catch (err) {
    res.status(500).json({ error: "Error de servidor" });
    console.log(err);
  }
});

module.exports = router;
