const mongoose = require("mongoose");
const express = require("express");
// const body_parser = require("body_parser");

const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

const authenticationRoute = require("./routes/authenticationRoute");
const authMW = require("./middlewares/authMW");

const ordersRouter = require("./routes/ordersRoute")

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

// Authentication
server.use(authenticationRoute);

// Authorization
// server.use(authMW);  // i make it comment until we make the token

// parsing data 
// server.use(body_parser.json()); //json
// server.use(body_parser.urlencoded()); //form
 
// routes
server.use(ordersRouter);


// not found MW
server.use((req, res, next) => {
  res.status(404).json({ msg: "not found" });
});

// error MW
server.use((error, req, res, next) => {
  res.status(error.status || 500).json({ msg: "" + error });
  // res.status(500).json({ message: "Internal sever error" });
});

