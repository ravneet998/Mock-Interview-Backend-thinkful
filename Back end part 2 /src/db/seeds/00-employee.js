const employees = require("./00-employee.json");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE employee RESTART IDENTITY CASCADE")
    .then(() => knex("employee").insert(employees));
};
