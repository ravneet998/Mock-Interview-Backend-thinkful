exports.up = function (knex) {
  return knex.schema.createTable("customer", (table) => {
    table.increments();
    table.string("name");
    table.string("address");
    table.datetime("date_joined");
    table.string("contact_name");
    table.string("contact_number");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("customer");
};
