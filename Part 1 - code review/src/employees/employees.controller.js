const list = (req, response) => {
  const knex = req.app.get("db");
  return knex
    .select()
    .from("employee")
    .then((employees) =>
      employees ? response.json({ data: employees }) : response.sendStatus(404)
    )
    .catch((err) => response.sendStatus(500));
};

const create = (req, response) => {
  const { username, first_name, last_name } = req.body;
  const knex = req.app.get("db");
  knex
    .insert(
      {
        username,
        first_name,
        last_name,
      },
      ["id"]
    )
    .into("employee")
    .then((id) => (id ? response.json({ data: id }) : response.sendStatus(404)))
    .catch((err) => response.sendStatus(500));
};

module.exports = {
  list,
  create,
};
