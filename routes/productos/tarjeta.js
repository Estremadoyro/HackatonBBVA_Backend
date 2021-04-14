const express = require("express");
const router = express.Router();
const Cliente = require("../../models/Cliente");
const { validEmail } = require("../../functions/misc");

// Tarjetas:

// DNI
// Correo_electrónico
// Operador
// Número_Celular

router.post("/", async (req, res) => {
  const operadores = ["MOVISTAR", "ENTEL", "CLARO"];

  const { dni, celular, email, edad, operador } = req.body;

  if (!dni || !celular || !email || !edad || !operador) {
    res.status(400).json({ error: "Debe llenar todos los campos" });
    return;
  }
  const operadorUpper = operador.toUpperCase();
  if (dni.length !== 8) {
    res.status(400).json({ error: "Ingrese un número de DNI válido" });
  }
  if (celular.length !== 9) {
    res.status(400).json({ error: "Ingrese un número de Celular válido" });
  }
  if (edad < 18) {
    res.status(400).json({ error: "Debe cumplir con la mayoría de edad para tramitar un seguro" });
  }
  if (!validEmail(email)) {
    res.status(400).json({ error: "Ingrese un email válido" });
  }
  if (!operadores.includes(operadorUpper)) {
    res.status(400).json({ error: "Su operadora no está disponible (MOVISTAR, ENTEL, CLARO)" });
  }

  const newCliente = new Cliente({
    dni: dni,
    email: email,
    celular: celular,
    edad: edad,
    operador: operador,
  });

  const newProducto = {
    nombreProcuto: "Tarjeta",
  };

  try {
    const encontrarCliente = await Cliente.findOne({ dni: dni });
    if (encontrarCliente) {
      res.status(400).json({ error: "Ya existe un prestamo solicitado bajo este DNI" });
      return;
    }
    //Crear nuevo cliente sobre dni
    await newCliente.save();
    const newProducto = {
      nombreProducto: "Tarjeta",
    };
    //Agregar producto a nuevo cliente
    const cliente = await Cliente.findOne({ dni: dni });
    cliente.productos.unshift(newProducto);
    await cliente.save();

    res.status(200).json({ cliente: cliente, msg: `Tarjeta solicitada exitosmanete al cliente ${dni}` });
  } catch (err) {
    res.status(500).json({ error: "Error de servidor" });
    console.log(err);
  }
});
module.exports = router;
