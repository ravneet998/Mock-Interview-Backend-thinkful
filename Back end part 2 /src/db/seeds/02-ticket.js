const tickets = require("./02-ticket.json");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE ticket RESTART IDENTITY CASCADE")
    .then(() => knex("ticket").insert(tickets));
};
