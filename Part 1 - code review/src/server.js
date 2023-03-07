const express = require("express");
const employeeRouter = require("./employees/employees.router");
const ticketRouter = require("./tickets/tickets.router");

const createServer = (knex, port = 3000) => {
  const app = express();
  app.set("db", knex);
  app.use(express.json());
  app.use("/employees", employeeRouter);
  app.use("/tickets", ticketRouter);

  app.use((error, req, response, next) => {
    console.error(error);
    const { status = 500, message = "Something went wrong!" } = error;
    response.status(status).json({ error: message });
  });

  const server = app.listen(port, () =>
    console.log(`[server] listening on port ${port}`)
  );
  return {
    app,
    close: (cb) =>
      server.close(() => {
        console.log("[server] closed");
        cb && cb();
      }),
  };
};
module.exports = { createServer };
