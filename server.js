const express = require("express");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 5000;
const connectDB = require("./db");

//DB Connection
connectDB(mongoose.connect(config.DB,{ useNewUrlParser: true }));


//Middleware
app.use(express.json({ extended: false }));
app.use(cors());
//Routes

app.use("/api/auth/jwt", require("./routes/auth/jwt"));
app.use("/api/auth/jwt", require("./routes/auth/jwt"));
app.use("/api/auth/google", require("./routes/auth/google"));
app.use("/api/auth/facebook", require("./routes/auth/facebook"));
app.use("/api/producto/tarjeta", require("./routes/productos/tarjeta"));
app.use("/api/producto/prestamo", require("./routes/productos/prestamo"));
app.use("/api/producto/segurovida", require("./routes/productos/segurovida"));

app.listen(PORT, () => {
  console.log(`Server running @ ${PORT}`);
});
