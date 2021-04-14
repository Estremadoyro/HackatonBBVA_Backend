const express = require("express");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 5000;
const connectDB = require("./db");

//DB Connection
connectDB();

//Middleware
app.use(express.json({ extended: false }));
app.use(cors());
//Routes
app.use("/api/auth/jwt", require("./routes/auth/jwt"));
app.use("/api/auth/google", require("./routes/auth/google"));
app.use("/api/auth/facebook", require("./routes/auth/facebook"));

app.listen(PORT, () => {
  console.log(`Server running @ ${PORT}`);
});
