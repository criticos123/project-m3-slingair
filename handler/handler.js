const { v4: uuidv4 } = require("uuid");
const { flights } = require("../test-data/flightSeating");
const { reservations } = require("../test-data/reservations");
let emailObj = undefined;
const { request } = require("express");

const handleSeat = (req, res) => {
  const flightInfo = flights[req.params.number];
  res.status(200).json({ flightInfo });
};

const handlegetConfirm = (req, res) => {
  const id = req.params.id;
  const foundReserve = reservations.find((item) => item.id === id);
  res.json(foundReserve);
};
const postReserve = (req, res) => {
  const reservation = req.body;
  reservation.id = uuidv4();
  reservations.push(reservation);
  res.status(200).json({ id: reservation.id });
};
const postReserveEmail = (req, res) => {
  const reservedEmail = req.body.email;
  emailObj = reservedEmail;
  console.log(emailObj);
  res.json(emailObj);
};
const handleFlights = (req, res) => {
  const flightNumbers = Object.keys(flights);
  res.json({ flightNumbers });
};
const handleReservePage = (req, res) => {
  const foundEmail = reservations.find(
    (item) => item.email === req.params.email
  );

  if (foundEmail) {
    res.json(foundEmail);
  } else {
    res.status(404).json({ error: "error" });
  }
};
module.exports = {
  handleSeat,
  handlegetConfirm,
  postReserve,
  postReserveEmail,
  handleFlights,
  handleReservePage,
};
