const knex = require("../db/connection");

const tableName = "customer";

function read(customer_id) {
  // Complete the implementation of this method.
  return knex("customer").select("*").where({id: customer_id}).first();
}

function create(newCustomer) {
  // Complete the implementation of this method.
  return knex("customer")
    .insert(newCustomer)
    .returning("*")
    .then ((createdRecords) => createdRecords[0]); 
}

module.exports = {
  create,
  read,
};
