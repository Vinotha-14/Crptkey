const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const transactionRoutes = require("./routes/transaction");

const app = express();
app.use(cors());
app.use(express.json());

app.use(session({
    secret: "cryptkeysecret",
    resave: false,
    saveUninitialized: true
}));

mongoose.connect("mongodb://127.0.0.1:27017/cryptkey", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/transaction", transactionRoutes);

const PORT = 5002; // Make sure no other process is using it
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));