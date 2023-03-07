const router = require("express").Router();
const controller = require("./tickets.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").post(controller.create).all(methodNotAllowed);

router
  .route("/:ticketId")
  .get(controller.read)
  .patch(controller.update)
  .all(methodNotAllowed);

module.exports = router;
