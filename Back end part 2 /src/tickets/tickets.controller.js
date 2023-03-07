const service = require("./tickets.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const create = async (req, response) => {
  const data = await service.create(req.body.data);
  response.status(201).json({ data });
};

function read(req, res) {
  res.json({ data: res.locals.ticket });
}

async function ticketExists(req, res, next) {
  const { ticketId } = req.params;

  const ticket = await service.read(ticketId);

  if (ticket) {
    res.locals.ticket = ticket;
    return next();
  }
  next({ status: 404, message: `Ticket id not found: ${ticketId}` });
}

async function update(req, res) {
  const { ticketId } = req.params;
  const { resolution_date } = req.body;

  const data = await service.update({ ticketId, resolution_date });
  res.json(data);
}

module.exports = {
  create: [asyncErrorBoundary(create)],
  read: [asyncErrorBoundary(ticketExists), read],
  update: [asyncErrorBoundary(ticketExists), asyncErrorBoundary(update)],
};
