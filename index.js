const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");

const authenticationRoute = require("./routes/authenticationRoute");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoute");
const orderRoutes=require("./routes/ordersRoute")
const authMW = require("./middlewares/authMW");

const port = process.env.port || 8080;
const server = express();
dotenv.config();

mongoose
  .connect("mongodb://127.0.0.1:27017/comfy")
  .then(() => {
    console.log("DB is connected");
    server.listen(port, () => {
      console.log("Up and listenin to port", port);
    });
  })
  .catch((error) => console.log("Error in DB " + error));

server.use(cors());

// logging MW
server.use(morgan("short"));

server.use(express.json());

// authentication
// server.use(authenticationRoute);

// authorization
// server.use(authMW);

// routes
server.use(productRoutes);
server.use(userRoutes);
server.use(categoryRoutes);
server.use(orderRoutes);

// not found MW
server.use((req, res, next) => {
  res.status(404).json({ msg: "not found" });
});

// error MW
server.use((error, req, res, next) => {
  res.status(error.status || 500).json({ msg: "" + error });
  // res.status(500).json({ message: "Internal sever error" });
});
