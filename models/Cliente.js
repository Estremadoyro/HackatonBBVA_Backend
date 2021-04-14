const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClienteSchema = new Schema({
  dni: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  productos: [
    {
      nombreProducto: {
        type: String,
        required: false,
      },
      fechaProducto: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  edad: {
    type: Number,
    required: true,
  },
  operador: {
    type: String,
  },
  celular: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Cliente = mongoose.model("clientes", ClienteSchema);
