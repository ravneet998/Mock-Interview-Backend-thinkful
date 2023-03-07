if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

const customersRouter = require("./customers/customers.router");
const employeesRouter = require("./employees/employees.router");
const ticketsRouter = require("./tickets/tickets.router");

const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

app.use(express.json());

app.use("/customers", customersRouter);
app.use("/employees", employeesRouter);
app.use("/tickets", ticketsRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
