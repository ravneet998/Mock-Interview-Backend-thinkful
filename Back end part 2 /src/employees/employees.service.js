const knex = require("../db/connection");

const tableName = "employee";

function list() {
  return knex(tableName);
}

function create(newEmployee) {
  return knex(tableName)
    .insert(newEmployee, "*")
    .then((createdRecords) => createdRecords[0]);
}

module.exports = {
  create,
  list,
};
