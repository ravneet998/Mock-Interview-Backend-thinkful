const knex = require("../db/connection");

const tableName = "ticket";

function list() {
  return knex(tableName);
}

function create(newTicket) {
  return knex(tableName)
    .insert(newTicket, "*")
    .then((createdRecords) => createdRecords[0]);
}

function read(ticket_id) {
  return knex(tableName).where({ ticket_id }).first();
}

module.exports = {
  create,
  list,
  read,
};
