const { v4: uuidv4 } = require("uuid");
const { flights } = require("../test-data/flightSeating");
const { reservations } = require("../test-data/reservations");
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
const handleFlights = (req, res) => {
  const flightNumbers = Object.keys(flights);
  res.json({ flightNumbers });
};
const handleReservePage = (res, req) => {
  const id = req.params.id;
  const foundReserve = reservations.find((item) => item.id === id);
  res.json(foundReserve);
};
module.exports = {
  handleSeat,
  handlegetConfirm,
  postReserve,
  handleFlights,
  handleReservePage,
};
