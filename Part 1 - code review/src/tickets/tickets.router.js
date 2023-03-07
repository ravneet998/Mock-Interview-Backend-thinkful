const router = require("express").Router();
const controller = require("./tickets.controller");
//Helper function

//Routers

router.route("/").post((req, response) => {
  const { employee_id, customer_id, case_start_date, status } = req.body;
  const knex = req.app.get("db");
  knex
    .table("ticket")
    .insert(
      {
        employee_id,
        customer_id,
        case_start_date,
        status,
      },
      ["id"]
    )
    .then((data) => {
      response.status(201).json({ data });
    });
});

router
  .route("/:ticketId")
  .get(controller.read)
  //.get((req, response) => {
  .patch((req, response) => {
    const { ticketId } = req.params;
    const knex = req.app.get("db");
    const { resolution_date } = req.body;

    knex
      .table("ticket")
      .update({ resolution_date }, ["id"])
      .where({ id: ticketId })
      .then((data) => response.json(data))
      .catch((err) => response.sendStatus(500));
  });

module.exports = router;
