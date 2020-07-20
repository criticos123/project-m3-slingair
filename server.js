"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const {
  handleSeat,
  handlegetConfirm,
  postReserve,
  handleFlights,
  handleReservePage,
} = require("./handler/handler");

express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .set("view engine", "ejs")
  .use(morgan("dev"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  // endpoints
  .get("/flights", handleFlights)
  .get("/flights/:number", handleSeat)
  .get("/users/:id", handlegetConfirm)
  .post("/users", postReserve)
  .get("/reservation/:id", handleReservePage)

  .use((req, res) => res.send("Not Found"))
  .listen(8000, () => console.log(`Listening on port 8000`));
