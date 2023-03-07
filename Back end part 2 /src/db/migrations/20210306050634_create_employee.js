exports.up = function (knex) {
  return knex.schema.createTable("employee", (table) => {
    table.increments();
    table.string("username");
    table.string("first_name");
    table.string("last_name");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("employee");
};
