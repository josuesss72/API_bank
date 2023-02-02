const express = require("express");
const cors = require("cors");
const { userRouters } = require("../routes/user.routes");
const { db } = require("../database/db");
const AppError = require("../utils/appError");
const globalErrorHandler = require("../controllers/error.controller");
const { transfersRouters } = require("../routes/transfers.routes");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.paths();
    this.database();
    this.middlewares();
    this.routes();
  }
  paths() {
    return {
      users: "/api/v1/users",
      transfers: "/api/v1/transfers",
    };
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }
  database() {
    db.authenticate()
      .then((res) => console.log("database authenticate"))
      .catch((err) => console.log("database not authenticate: ", err));
    db.sync()
      .then((res) => console.log("database sync"))
      .catch((err) => console.log(err));
  }
  routes() {
    this.app.use(this.paths().users, userRouters);
    this.app.use(this.paths().transfers, transfersRouters);

    this.app.all("*", (req, res, next) => {
      return next(
        new AppError(`Cant find ${req.originalUrl} on this server!`, 404)
      );
    });
    this.app.use(globalErrorHandler);
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("Server Running On Port", this.port);
    });
  }
}

module.exports = Server;
