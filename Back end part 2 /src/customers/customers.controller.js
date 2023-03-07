const service = require("./customers.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function customerExists(req, res, next) {
  const { customerId } = req.params;

  const customer = await service.read(customerId);

  if (customer) {
    res.locals.customer = customer;
    return next();
  }
  next({ status: 404, message: `Customer id not found: ${customerId}` });
}

function read(req, res) {
  // Complete the implementation of this method.
  const{ customer: data } = res.locals;
  res.json({ data })
}

async function create(req, res) {
  // Complete the implementation of this method.
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

// Make sure exports are correct.
module.exports = {
  read: [asyncErrorBoundary(customerExists), read],
  create,
};
