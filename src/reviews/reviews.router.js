const router = require("express").Router()
const controller = require("./reviews.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")

router.route("/:reviewId([0-9]+)")
    .put(controller.update)
    .delete(controller.delete)
    .get(controller.read)
    .all(methodNotAllowed)

module.exports = router