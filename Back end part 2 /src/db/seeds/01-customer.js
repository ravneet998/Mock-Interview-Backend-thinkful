const customers = require("./01-customer.json");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE customer RESTART IDENTITY CASCADE")
    .then(() => knex("customer").insert(customers));
};
