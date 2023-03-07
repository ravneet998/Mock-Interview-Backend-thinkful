const router = require("express").Router();
const controller = require("./customers.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//Add the appropriate methods in this file
router
.route("/")
.post(controller.create)
.all(methodNotAllowed)

router
.route("/:customerId")
.get(controller.read)
.all(methodNotAllowed)



module.exports = router;
