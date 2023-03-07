exports.up = function (knex) {
  return knex.schema.createTable("ticket", (table) => {
    table.increments();
    table
      .integer("employee_id")
      .references("id")
      .inTable("employee")
      .onDelete("CASCADE")
      .notNull();
    table
      .integer("customer_id")
      .references("id")
      .inTable("customer")
      .onDelete("CASCADE")
      .notNull();
    table.datetime("case_start_date");
    table.datetime("resolution_date");
    table.string("status");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("ticket");
};
