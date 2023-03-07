const read = (req, res) => {
  const { ticketId } = req.params;
    const knex = req.app.get("db");
    return knex
      .select()
      .from("ticket")
      .where("ticket.id", req.params.ticketId)
      .fullOuterJoin("customer", "customer.id", "ticket.customer_id")
      .then((ticket) =>
        ticket ? res.json({ data: ticket }) : res.sendStatus(404)
      )
      .catch((err) => res.sendStatus(500));
  };
  

const ticketExists = (req, response, next) => {
  const { ticketId } = req.params;
  const knex = req.app.get("db");
  knex
    .table("ticket")
    .where({ id: ticketId })
    .first()
    .then((ticket) => {
      if (ticket) {
        return next();
      }
      next({
        status: 404,
        message: `Ticket id not found: ${ticketId}`,
      });
    });
};

const update = (req, res) => {};

const create = (req, res) => {};

module.exports = {
  read: [ticketExists, read],
  update: [ticketExists, update],
  create,
};
