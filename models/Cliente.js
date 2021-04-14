const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClienteSchema = new Schema({
  uid: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  dni: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  pic: {
    type: String,
    required: false,
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
  password: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Cliente = mongoose.model("clientes", ClienteSchema);
